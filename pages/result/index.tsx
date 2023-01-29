import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components/common';
import { HasHouseData } from '~/components/result';
import { houseStateSelector } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseStateSelector);
  const [hasNoData, setHasNoData] = useState(false);

  useEffect(() => {
    if (!houseRecoilState.danjiName) {
      setHasNoData(() => true);
    } else {
      setHasNoData(() => false);
    }
  }, []);

  const handlePushPrevPage = useCallback(() => {
    router.push(PAGE_ROUTE.RESEARCH_SECOND);
  }, []);

  return (
    <>
      <NextHead title='결과' />
      <StyledContainer>
        {houseRecoilState.estimateTime === false ? (
          <div>
            축하합니다!!{' '}
            <StyledMarkText>{houseRecoilState.danjiName}</StyledMarkText> 을
            현재 자산으로 살수 있어요!
          </div>
        ) : houseRecoilState.cost ? (
          <HasHouseData
            houseState={houseRecoilState}
            handleButtonClick={handlePushPrevPage}
          />
        ) : null}

        {/* 데이터가 없을 때 */}
        {hasNoData && (
          <>
            <div>잘못된 접근입니다. </div>
            <button onClick={handlePushPrevPage}>
              먼저 데이터를 입력해주세요!
            </button>
          </>
        )}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;
`;

const StyledMarkText = styled.span`
  font-size: 25px;
  color: #fb3636;
  font-weight: 700;
`;

export default ResearchResultPage;
