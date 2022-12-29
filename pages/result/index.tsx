import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NextHead } from '~/components/common';
import { Button } from '~/components/domains';
import { HouseData } from '~/types/house';
import { calculateEstimateTime } from '~/utils/functions/house';
import { getHouse } from '~/api/house';
import { researchState } from '~/atoms/research';

const ResearchResultPage = () => {
  const router = useRouter();
  const [houseState, setHouseState] = useState<HouseData>();
  const [isLoading, setIsLoading] = useState(false);
  const researchRecoilState = useRecoilValue(researchState);
  const [isError, setIsError] = useState(false);

  // TODO: 로딩 spinner or something
  // TODO: 전역상태에 값이 없을 때 (방어코드)
  // TODO: 데이터가 없을 때
  // TODO: 기본 값 제거
  // TODO: 통신 에러가 발생했을 때

  const fetchHouse = useCallback(async () => {
    try {
      const { data } = await getHouse({
        jibunAddress: researchRecoilState.jibunAddress,
      });
      if (data) {
        setHouseState(() => ({
          ...data.data,
          estimateTime: calculateEstimateTime({
            budget: researchRecoilState.cash
              ? parseInt(researchRecoilState.cash, 10)
              : 4000,
            saving: researchRecoilState.saving
              ? parseInt(researchRecoilState.saving, 10)
              : 250,
            rate: researchRecoilState.rate ? +researchRecoilState.rate : 5.5,
            targetPrice: data.data.cost || 5000,
          }),
        }));
      }
    } catch {
      setIsError(true);
    }
  }, [researchRecoilState]);

  useEffect(() => {
    setIsLoading(() => true);
    fetchHouse();
    setIsLoading(() => false);
  }, []);

  const handleButtonClick = () => {
    router.push('/');
  };

  if (!houseState || isLoading) return <div>데이터를 불러오고 있습니다...</div>;

  if (!houseState?.danjiName && !isLoading) return <div>데이터가 없습니다</div>;

  return (
    <>
      <NextHead title='결과' />

      <div>{houseState.danjiName}</div>
      <div>{houseState.cost}</div>
      {houseState.estimateTime ? (
        <div>
          {houseState.estimateTime[0]}년 {houseState.estimateTime[1]}개월
        </div>
      ) : (
        <div>축하합니다 현재 자산으로 살수 있어요!</div>
      )}
      <Button content='홈으로' handleButtonClick={handleButtonClick} />
    </>
  );
};

export default ResearchResultPage;
