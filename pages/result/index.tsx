import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components/common';
import { Button } from '~/components/domains';
import { KakaoMap } from '~/components/kakao';
import { houseState } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseState);
  const [hasNoData, setHasNoData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    router.push(PAGE_ROUTE.HOME);
  };

  const handleDrawerOpen = () => {
    setIsOpen((prev) => !prev);
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

      {isOpen && !hasNoData && (
        <KakaoMap
          latitude={houseRecoilState.latitude}
          longitude={houseRecoilState.longitude}
        />
      )}

      <StyledButtonContainer>
        <StyledButtonWrapper>
          <StyledButton onClick={handleDrawerOpen}>지도보기</StyledButton>
        </StyledButtonWrapper>
      </StyledButtonContainer>
    </>
  );
};

const StyledButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 64px;
  width: calc(100% - ${(props) => props.theme.padding.default_left_right} * 2);
  z-index: 8000;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  height: 100%;
  width: 68px;
`;

export default ResearchResultPage;
