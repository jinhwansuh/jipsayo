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

  const fetchHouse = useCallback(async () => {
    const { data } = await getHouse({
      jibunAddress: '충남 천안시 서북구 성정동 1438',
    });

    // TODO: 방어코드 처리를 하면 삭제를 해야함
    setHouseState(() => ({
      ...data.data,
      estimateTime: calculateEstimateTime({
        budget: researchRecoilState.cash
          ? parseInt(researchRecoilState.cash, 10)
          : 4000,
        saving: researchRecoilState.saving
          ? parseInt(researchRecoilState.saving, 10)
          : 250,
        rate: researchRecoilState.rate
          ? parseInt(researchRecoilState.rate, 10)
          : 5.5,
        targetPrice: data.data.cost,
      }),
    }));
  }, []);

  useEffect(() => {
    setIsLoading(() => true);
    fetchHouse();
    setIsLoading(() => false);
  }, []);

  const handleButtonClick = () => {
    router.push('/');
  };

  if (!houseState || isLoading) return <div>로딩중...</div>;

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
