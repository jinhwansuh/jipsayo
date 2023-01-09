import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NextHead } from '~/components/common';
import { Button } from '~/components/domains';
import { houseState } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseState);
  const [hasNoData, setHasNoData] = useState(false);

  const handleButtonClick = () => {
    router.push(PAGE_ROUTE.HOME);
  };

  useEffect(() => {
    if (!houseRecoilState.danjiName) {
      setHasNoData(() => true);
    } else {
      setHasNoData(() => false);
    }
  }, []);

  return (
    <>
      <NextHead title='결과' />

      {houseRecoilState.cost ? (
        <>
          <div>{houseRecoilState.danjiName}</div>
          <div>{houseRecoilState.cost}</div>
          <div>{houseRecoilState.estimateTime}</div>
        </>
      ) : houseRecoilState.estimateTime === false ? (
        <div>
          축하합니다 {houseRecoilState?.danjiName}을 현재 자산으로 살수 있어요!
        </div>
      ) : (
        ''
      )}

      {/* 데이터가 없을 때 */}
      {hasNoData && (
        <>
          <div>잘못된 접근입니다. </div>
          <button onClick={() => router.push(PAGE_ROUTE.RESEARCH_SECOND)}>
            먼저 데이터를 입력해주세요!
          </button>
        </>
      )}

      <Button content='홈으로' handleButtonClick={handleButtonClick} />
    </>
  );
};

export default ResearchResultPage;
