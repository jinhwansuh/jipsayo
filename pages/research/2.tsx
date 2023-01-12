import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilState } from 'recoil';
import Transitions from '~/layouts/Transitions';
import { NextHead } from '~/components/common';
import { DaumPostFrame } from '~/components/domains';
import { SearchAddressData, SearchResize } from '~/types/research';
import { calculateEstimateTime } from '~/utils/functions/house';
import { fetchDaumPostAPI } from '~/utils/functions/research';
import { initialAddress } from '~/utils/house';
import { getHouse } from '~/api/house';
import { postResearch } from '~/api/research';
import { houseState } from '~/atoms/house';
import { researchIndexState, researchState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const DynamicResearch2 = dynamic(
  () => import('~/components/dynamicPage/DynamicResearch2'),
  {
    ssr: false,
  },
);

const ResearchSecondPage = () => {
  const router = useRouter();
  const searchFrameRef = useRef<HTMLDivElement>(null);
  const [hasPrevData, setHasPrevData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addressState, setAddressState] =
    useState<typeof initialAddress>(initialAddress);
  const [isComplete, setIsComplete] = useState(false);
  const [researchRecoilState, setResearchRecoilState] =
    useRecoilState(researchState);
  const [pageRecoilState, setPageRecoilState] =
    useRecoilState(researchIndexState);
  const [isError, setIsError] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [houseRecoilState, setHouseRecoilState] = useRecoilState(houseState);

  useEffect(() => {
    if (pageRecoilState.first) {
      setHasPrevData(true);

      // ref current 정의
      const searchFrame = searchFrameRef.current as HTMLDivElement;
      return;
    }

    router.replace(PAGE_ROUTE.RESEARCH_FIRST, undefined, { shallow: true });
  }, []);

  const frameCloseClick = () => {
    setIsOpen(false);
  };

  const frameOpenClick = () => {
    setAddressState(() => initialAddress);
    setIsComplete(() => false);
    setIsNoData(() => false);
    fetchDaumPostAPI({
      setAddressState,
      setIsOpen,
      setIsComplete,
      searchFrameRef,
    });
    setIsOpen(() => true);
  };

  const handleFetchData = async () => {
    if (addressState.userSelectedType) {
      setResearchRecoilState((prev) => ({ ...prev, ...addressState }));
      try {
        await postResearch({
          savedMoney: +researchRecoilState.cash,
          moneyPerMonth: +researchRecoilState.saving,
          jibunAddress: addressState.jibunAddress,
          increaseRate: +researchRecoilState.rate,
        });

        const { data } = await getHouse({
          roadAddress: addressState.roadAddress,
          danjiName: addressState.buildingName,
        });
        if (isEmpty(data.data)) {
          setIsNoData(() => true);
        } else {
          setIsNoData(() => false);
          setHouseRecoilState(() => ({
            ...data.data,
            estimateTime: calculateEstimateTime({
              budget: +researchRecoilState.cash,
              saving: +researchRecoilState.saving,
              rate: +researchRecoilState.rate,
              targetPrice: data.data.cost,
            }),
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

      {hasPrevData && (
        <Transitions>
          <DynamicResearch2
            frameOpenClick={frameOpenClick}
            addressState={addressState}
          />

          <DaumPostFrame
            isOpen={isOpen}
            searchFrameRef={searchFrameRef}
            frameCloseClick={frameCloseClick}
          />

          {/*데이터 fetching중  */}
          {isFetching && <div>데이터 fetching중 입니다.</div>}

          {/* 받아온 데이터가 없을 때 */}
          {isNoData && <div>데이터가 없습니다.</div>}

          {/* 서버에러가 발생했을 때 */}
          {isError && <div>서버와 통신 에러입니다.</div>}
        </Transitions>
      )}
    </>
  );
};

export default ResearchSecondPage;
