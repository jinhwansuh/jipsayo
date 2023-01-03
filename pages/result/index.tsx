import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import { NextHead } from '~/components/common';
import { Button } from '~/components/domains';
import { HouseData } from '~/types/house';
import { calculateEstimateTime } from '~/utils/functions/house';
import { getHouse } from '~/api/house';
import { researchState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const [houseState, setHouseState] = useState<HouseData>();
  const [isLoading, setIsLoading] = useState(true);
  const researchRecoilState = useRecoilValue(researchState);
  const [isError, setIsError] = useState(false);
  const [hasNoData, setHasNoData] = useState(false);

  const fetchHouse = useCallback(async () => {
    try {
      const { data } = await getHouse({
        roadAddress: researchRecoilState.roadAddress,
        danjiName: researchRecoilState.buildingName,
      });

      if (isEmpty(data.data)) {
        setHasNoData(() => true);
      } else {
        setHouseState(() => ({
          ...data.data,
          estimateTime: calculateEstimateTime({
            budget: +researchRecoilState.cash,
            saving: +researchRecoilState.saving,
            rate: +researchRecoilState.rate,
            targetPrice: data.data.cost,
          }),
        }));
      }
      setIsError(false);
    } catch {
      // TODO: 통신 에러가 발생했을 때 처리
      setIsError(true);
    }
  }, [researchRecoilState]);

  useEffect(() => {
    // TODO: 전역상태에 값이 없을 때 (방어코드)
    fetchHouse();
    setIsLoading(() => false);
  }, []);

  const handleButtonClick = () => {
    router.push(PAGE_ROUTE.HOME);
  };

  // TODO: 로딩 spinner or something
  if (isLoading) return <div>데이터를 불러오고 있습니다...</div>;

  return (
    <>
      <NextHead title='결과' />

      {houseState && houseState?.estimateTime ? (
        <>
          <div>{houseState.danjiName}</div>
          <div>{houseState.cost}</div>
          <div>{houseState.estimateTime}</div>
        </>
      ) : houseState && !houseState?.estimateTime ? (
        <div>
          축하합니다 {houseState?.danjiName}을 현재 자산으로 살수 있어요!
        </div>
      ) : (
        ''
      )}

      {/* 데이터를 불러오지 못했을 때 */}
      {hasNoData && (
        <>
          <div>주소를 정확하게 입력해주세요. </div>
          <div>(ex, 압구정 현대아파트)</div>
          <button onClick={() => router.push(PAGE_ROUTE.RESEARCH_SECOND)}>
            다시 입력하러 가기
          </button>
        </>
      )}

      {/* 서버 에러가 발생했을 때 */}
      {isError && (
        <>
          <div>서버와 통신 오류입니다.</div>
          <button onClick={fetchHouse}>데이터 다시 불러오기</button>
        </>
      )}

      <Button content='홈으로' handleButtonClick={handleButtonClick} />
    </>
  );
};

export default ResearchResultPage;
