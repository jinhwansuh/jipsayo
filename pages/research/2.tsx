import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { DaumPostFrame, NextHead } from '~/components/common';
import { getHouse } from '~/api/house';
import { postResearch } from '~/api/research';
import { fetchHouseStateAtom } from '~/atoms/house';
import { researchIndexStateAtom, researchStateAtom } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';
import { useDaumPost } from '~/hooks';

const DynamicSearchAddress = dynamic(
  () => import('~/components/dynamic/DynamicSearchAddress'),
  {
    ssr: false,
  },
);

const ResearchSecondPage = () => {
  const router = useRouter();
  const searchFrameRef = useRef<HTMLDivElement>(null);
  const [hasPrevData, setHasPrevData] = useState(false);
  const {
    frameOpenClick,
    isOpen,
    addressState,
    isComplete,
    frameCloseClick,
    isNoData,
    setIsNoData,
  } = useDaumPost({
    searchFrameRef,
  });
  const [researchRecoilState, setResearchRecoilState] =
    useRecoilState(researchStateAtom);
  const [pageRecoilState, setPageRecoilState] = useRecoilState(
    researchIndexStateAtom,
  );
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const setHouseRecoilState = useSetRecoilState(fetchHouseStateAtom);

  useEffect(() => {
    if (pageRecoilState.first) {
      setHasPrevData(true);
      return;
    }

    router.replace(PAGE_ROUTE.RESEARCH_FIRST, undefined, { shallow: true });
  }, []);

  const handleFetchData = async () => {
    // 유저가 주소를 선택을 했을 때
    if (addressState.userSelectedType) {
      const { cash, saving, rate } = researchRecoilState;
      const { jibunAddress, roadAddress, buildingName } = addressState;

      setResearchRecoilState((prev) => ({ ...prev, ...addressState }));
      try {
        await postResearch({
          savedMoney: +cash,
          moneyPerMonth: +saving,
          jibunAddress: jibunAddress,
          increaseRate: +rate,
        });

        const { data } = await getHouse({
          roadAddress: roadAddress,
          danjiName: buildingName,
        });
        if (isEmpty(data.data)) {
          setIsNoData(() => true);
        } else {
          setIsNoData(() => false);
          setHouseRecoilState(() => ({
            ...data.data,
          }));
          setPageRecoilState((prev) => ({ ...prev, second: true }));
          router.push(PAGE_ROUTE.RESULT);
        }
        setIsError(() => false);
      } catch {
        setIsError(() => true);
      }
    }
  };

  useEffect(() => {
    if (isComplete) {
      setIsFetching(() => true);
      handleFetchData();
      setIsFetching(() => false);
    }
  }, [isComplete]);

  return (
    <>
      <NextHead title='주소 입력' />
      <StyledContainer>
        {hasPrevData && (
          <StyledTransitions>
            <DynamicSearchAddress
              frameOpenClick={frameOpenClick}
              addressState={addressState}
            />
          </StyledTransitions>
        )}
        <div style={{ margin: '5px 0' }}>
          <DaumPostFrame
            isOpen={isOpen}
            searchFrameRef={searchFrameRef}
            frameCloseClick={frameCloseClick}
          />
        </div>

        {/*데이터 fetching중  */}
        {isFetching && <div>데이터 fetching중 입니다.</div>}

        {/* 받아온 데이터가 없을 때 */}
        {isNoData && <div>데이터가 없습니다.</div>}

        {/* 서버에러가 발생했을 때 */}
        {isError && <div>서버와 통신 에러입니다.</div>}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.padding.default_top_bottom}
    ${(props) => props.theme.padding.default_left_right};
`;

const StyledTransitions = styled(Transitions)`
  height: auto !important;
`;

export default ResearchSecondPage;
