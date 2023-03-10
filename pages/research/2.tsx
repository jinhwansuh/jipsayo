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
import { DaumPostFrame, Header, Loading, NextHead } from '~/components/common';
import { InfoMessage, ReferenceContent } from '~/components/research';
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
      handleFetchData();
    }
  }, [isComplete]);

  const handleHouseClick = useCallback(
    async ({ danjiName, roadAddress }: PrefetchedHouse) => {
      setIsFetching(true);
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
      setIsFetching(false);
    },
    [researchRecoilState],
  );

  const handleFetchData = async () => {
    // ????????? ????????? ????????? ?????? ???
    if (addressState.userSelectedType) {
      setIsFetching(true);
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
      setIsFetching(false);
    }
  };

  return (
    <>
      <NextHead title='?????? ??????' />

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

          {/*????????? fetching???  */}
          {isFetching && <Loading />}
          {/* ????????? ???????????? ?????? ??? */}
          {isNoData && <div>???????????? ????????????.</div>}
          {/* ??????????????? ???????????? ??? */}
          {isError && <div>????????? ?????? ???????????????.</div>}

          {!isLoading && (
            <>
              <InfoMessage />
              <div>
                <ReferenceContent
                  title='???????????? ?????????'
                  apartment={randomHighEnd}
                  handleHouseClick={handleHouseClick}
                />
                <ReferenceContent
                  title='?????? ????????? ?????????'
                  apartment={randomBigName}
                  handleHouseClick={handleHouseClick}
                />
              </div>
            </>
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

// local json????????? promise??? ?????? ?????? ??????
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
