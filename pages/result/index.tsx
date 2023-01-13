import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components/common';
import { KakaoMap } from '~/components/kakao';
import { houseState } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';

const ResearchResultPage = () => {
  const router = useRouter();
  const houseRecoilState = useRecoilValue(houseState);
  const [hasNoData, setHasNoData] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    if (isOpen === 'true') setIsDrawerOpen(() => true);
    else setIsDrawerOpen(() => false);
  }, [query]);

  const handleButtonClick = () => {
    router.push(PAGE_ROUTE.HOME);
  };

  const handleDrawerOpen = () => {
    router.push(`${PAGE_ROUTE.RESULT}?drawer_open=true`);
  };

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

      {isDrawerOpen && (
        <KakaoMap
          latitude={!hasNoData ? houseRecoilState.latitude : 33.45}
          longitude={!hasNoData ? houseRecoilState.longitude : 126.57}
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
