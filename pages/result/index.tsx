import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components/common';
import { KakaoMapOpenButton } from '~/components/domains';
import { KakaoMapContainer } from '~/components/kakao';
import { houseState } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseState);
  const [hasNoData, setHasNoData] = useState(false);
  const [isKakaoMapOpen, setIsKakaoMapOpen] = useState(false);
  const query = router.query;

  useEffect(() => {
    if (!houseRecoilState.danjiName) {
      setHasNoData(() => true);
    } else {
      setHasNoData(() => false);
    }
  }, []);

  useEffect(() => {
    if (isEmpty(query)) return;
    const isOpen = query['drawer_open'];
    if (isOpen === 'true') setIsKakaoMapOpen(() => true);
    else setIsKakaoMapOpen(() => false);
  }, [query]);

  const handleKakaoMapButtonClick = useCallback(() => {
    router.push(`${PAGE_ROUTE.RESULT}?drawer_open=${!isKakaoMapOpen}`);
  }, [isKakaoMapOpen]);

  return (
    <>
      <NextHead title='결과' />

      {houseRecoilState.cost ? (
        <>
          <div>
            <StyledMarkText>{houseRecoilState.danjiName}</StyledMarkText>의
          </div>
          <div>
            가격은 <StyledMarkText>{houseRecoilState.won}</StyledMarkText>
            입니다.
          </div>
          <div>
            지금부터{' '}
            <StyledMarkText>{houseRecoilState.estimateTime}</StyledMarkText>{' '}
            걸립니다.
          </div>
        </>
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
