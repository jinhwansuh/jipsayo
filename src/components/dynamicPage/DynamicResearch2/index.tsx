import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { DaumPostFrame } from '~/components/domains';
import { SearchAddressData, SearchResize } from '~/types/research';
import { initialAddress } from '~/utils/house';
import { postResearch } from '~/api/research';
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
  const [isSending, setIsSending] = useState(false);

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

  const handleSubmitClick = async () => {
    setIsSending(() => true);
    if (addressState.userSelectedType) {
      setPageRecoilState((prev) => ({ ...prev, second: true }));
      setResearchRecoilState((prev) => ({ ...prev, ...addressState }));
      try {
        await postResearch({
          savedMoney: +researchRecoilState.cash,
          moneyPerMonth: +researchRecoilState.saving,
          jibunAddress: researchRecoilState.jibunAddress,
          increaseRate: +researchRecoilState.rate,
        });
        setIsError(false);
        router.push(PAGE_ROUTE.RESULT);
      } catch {
        setIsError(true);
      }
    }
    setIsSending(() => false);
  };

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

        <div>
          {isComplete && (
            <StyleButtonWrapper>
              <StyledMotionButton
                animate={{ scale: [1, 1.5, 1.2, 1] }}
                transition={{
                  ease: 'easeInOut',
                  repeat: Infinity,
                  duration: 2,
                }}
                onClick={handleSubmitClick}
                disabled={isSending}
              >
                {isSending ? 'Loading' : '다음으로'}
              </StyledMotionButton>
            </StyleButtonWrapper>
          )}
        </div>

        {isError && <div>서버와 통신 에러입니다.</div>}
      </Transitions>
    </>
  );
};

const StyledInputWrapper = styled.div`
  height: 50px;
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
`;

const StyledAlertText = styled.div`
  font-size: 18px;
`;

const StyleButtonWrapper = styled.div`
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const StyledMotionButton = styled(motion.button)`
  width: 60%;
  height: 50px;
  cursor: pointer;
`;

export default DynamicResearch2;
