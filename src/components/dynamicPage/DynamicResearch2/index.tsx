import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash-es';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { DaumPostFrame } from '~/components/domains';
import { SearchAddressData, SearchResize } from '~/types/research';
import { calculateEstimateTime } from '~/utils/functions/house';
import { initialAddress } from '~/utils/house';
import { getHouse } from '~/api/house';
import { postResearch } from '~/api/research';
import { houseState } from '~/atoms/house';
import { researchIndexState, researchState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const DynamicResearch2 = () => {
  const router = useRouter();
  const searchFrameRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    // ref current 정의
    const searchFrame = searchFrameRef.current as HTMLDivElement;
  }, []);

  const frameCloseClick = () => {
    setIsOpen(false);
  };

  const frameOpenClick = () => {
    setAddressState(() => initialAddress);
    setIsComplete(() => false);
    new daum.Postcode({
      oncomplete: function (data: SearchAddressData) {
        const {
          userSelectedType,
          roadAddress,
          jibunAddress,
          bname,
          buildingName,
          apartment,
          zonecode,
          autoJibunAddress,
          address,
        } = data;

        let extraAddr = '';

        if (userSelectedType === 'R') {
          if (bname !== '' && /[동|로|가]$/g.test(bname)) {
            extraAddr += bname;
          }
          if (buildingName !== '' && apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + buildingName : buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }

          setAddressState((prev) => ({
            ...prev,
            roadAddress,
            zonecode,
            userSelectedType,
            jibunAddress: autoJibunAddress,
            extraAddr,
            buildingName,
          }));
        } else {
          setAddressState((prev) => ({
            ...prev,
            userSelectedType,
            jibunAddress,
            roadAddress: address,
            zonecode,
            buildingName,
          }));
        }

        setIsOpen(() => false);
        setIsComplete(() => true);
      },

      onresize: function (size: SearchResize) {
        searchFrameRef.current!.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%',
    }).embed(searchFrameRef.current);

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
      <Transitions>
        <StyledInputWrapper onClick={frameOpenClick}>
          {addressState.userSelectedType === '' ? (
            <StyledAlertText>
              주소 입력 ( ex, 압구정 현대아파트 )
            </StyledAlertText>
          ) : addressState.userSelectedType === 'R' ? (
            <>
              <div>{addressState.roadAddress}</div>
              <div>{addressState.extraAddr}</div>
            </>
          ) : (
            <div>{addressState.jibunAddress}</div>
          )}
        </StyledInputWrapper>

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
    </>
  );
};

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50px;
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
`;

const StyledAlertText = styled.div`
  font-size: 18px;
`;

export default DynamicResearch2;
