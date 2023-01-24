import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components/common';
import { KakaoMapContainer } from '~/components/kakao';
import { HouseTooltip, KakaoMapOpenButton } from '~/components/result';
import { houseStateSelector } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseStateSelector);
  const [hasNoData, setHasNoData] = useState(false);
  const [isKakaoMapOpen, setIsKakaoMapOpen] = useState(false);

  useEffect(() => {
    if (!houseRecoilState.danjiName) {
      setHasNoData(() => true);
    } else {
      setHasNoData(() => false);
    }
  }, []);

  const handleKakaoMapButtonClick = useCallback(() => {
    setIsKakaoMapOpen((prev) => !prev);
  }, []);

  return (
    <>
      <NextHead title='결과' />

      {houseRecoilState.cost ? (
        <div>
          <div>
            <StyledMarkText>{houseRecoilState.danjiName}</StyledMarkText>의
          </div>
          <div>
            가격은 <StyledMarkText>{houseRecoilState.won}</StyledMarkText>
            <HouseTooltip
              content={`${houseRecoilState.dedicatedArea}m2 ${
                houseRecoilState.dealDate.split('T')[0]
              }`}
            />
            입니다.
          </div>
          <div>
            지금부터{' '}
            <StyledMarkText>{houseRecoilState.estimateTime}</StyledMarkText>{' '}
            걸립니다.
          </div>
        </div>
      ) : houseRecoilState.estimateTime === false ? (
        <div>
          축하합니다!!{' '}
          <StyledMarkText>{houseRecoilState.danjiName}</StyledMarkText> 을 현재
          자산으로 살수 있어요!
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

      {isKakaoMapOpen && <KakaoMapContainer />}

      <KakaoMapOpenButton
        handleButtonClick={handleKakaoMapButtonClick}
        isKakaoMapOpen={isKakaoMapOpen}
      />
    </>
  );
};

const StyledMarkText = styled.span`
  font-size: 25px;
  color: #fb3636;
  font-weight: 700;
`;

export default ResearchResultPage;
