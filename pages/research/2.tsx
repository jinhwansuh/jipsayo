import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { promises } from 'fs';
import { isEmpty, sampleSize } from 'lodash-es';
import path from 'path';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { DaumPostFrame, Header, NextHead } from '~/components/common';
import { ReferenceContent } from '~/components/research';
import { PrefetchedHouse, PrefetchedHouseResponse } from '~/types/research';
import { getHouse } from '~/api/house';
import { postResearch } from '~/api/research';
import { fetchHouseStateAtom } from '~/atoms/house';
import { researchIndexStateAtom, researchStateAtom } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';
import { useDaumPost } from '~/hooks';
import { Container } from '~/layouts';

const DynamicSearchAddress = dynamic(
  () => import('~/components/dynamic/DynamicSearchAddress'),
  {
    ssr: false,
  },
);

const ResearchSecondPage = ({
  highEnd,
  bigName,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
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
  const randomHighEnd = useMemo(() => {
    return sampleSize(highEnd.data, 3);
  }, []);

  const randomBigName = useMemo(() => {
    return sampleSize(bigName.data, 4);
  }, []);

  useEffect(() => {
    if (pageRecoilState.first) {
      setHasPrevData(true);
      setIsLoading(false);
      return;
    }

    router.replace(PAGE_ROUTE.RESEARCH_FIRST, undefined, { shallow: true });
  }, []);

  useEffect(() => {
    if (isComplete) {
      setIsFetching(true);
      handleFetchData();
      setIsFetching(false);
    }
  }, [isComplete]);

  const handleHouseClick = useCallback(
    async ({ danjiName, roadAddress }: PrefetchedHouse) => {
      const { cash, saving, rate } = researchRecoilState;
      try {
        await postResearch({
          savedMoney: +cash,
          moneyPerMonth: +saving,
          jibunAddress: roadAddress,
          increaseRate: +rate,
        });

        const { data } = await getHouse({
          roadAddress: roadAddress,
          danjiName: danjiName,
        });
        if (isEmpty(data.data)) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
          setHouseRecoilState({
            ...data.data,
          });
          setPageRecoilState((prev) => ({ ...prev, second: true }));
          router.push(PAGE_ROUTE.RESULT);
        }
        setIsError(false);
      } catch {
        setIsError(true);
      }
    },
    [researchRecoilState],
  );

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
          setIsNoData(true);
        } else {
          setIsNoData(false);
          setHouseRecoilState({
            ...data.data,
          });
          setPageRecoilState((prev) => ({ ...prev, second: true }));
          router.push(PAGE_ROUTE.RESULT);
        }
        setIsError(false);
      } catch {
        setIsError(true);
      }
    }
  };

  return (
    <>
      <NextHead title='주소 입력' />

      <Header backButton={true} pageTo={PAGE_ROUTE.RESEARCH_FIRST} />
      <Container>
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

          {!isLoading && (
            <div>
              <ReferenceContent
                title='하이엔드 아파트'
                apartment={randomHighEnd}
                handleHouseClick={handleHouseClick}
              />
              <ReferenceContent
                title='지역 브랜드 아파트'
                apartment={randomBigName}
                handleHouseClick={handleHouseClick}
              />
            </div>
          )}
        </StyledContainer>
      </Container>
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

// local json파일을 promise로 읽기 위한 함수
const fetchLocalJSONFile = async (src: string) => {
  const filePath = path.join(process.cwd(), src);
  const jsonData = await promises.readFile(filePath);
  return jsonData.toString();
};

export const getStaticProps: GetStaticProps<{
  highEnd: PrefetchedHouseResponse;
  bigName: PrefetchedHouseResponse;
}> = async () => {
  const highEndJSON = await fetchLocalJSONFile('/src/utils/data/highEnd.json');
  const bigNameJSON = await fetchLocalJSONFile('/src/utils/data/bigName.json');

  const highEnd = JSON.parse(highEndJSON.toString());
  const bigName = JSON.parse(bigNameJSON.toString());

  return {
    props: {
      highEnd: highEnd,
      bigName: bigName,
    },
  };
};

export default ResearchSecondPage;
