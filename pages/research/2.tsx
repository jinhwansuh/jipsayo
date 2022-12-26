import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { NextHead } from '~/components';
import { SearchAddressData, SearchResize } from '~/types/research';
import { initialAddress } from '~/utils/house';
import { researchSecondState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const ResearchSecondPage = () => {
  const router = useRouter();
  const searchFrameRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchFrame = searchFrameRef.current as HTMLDivElement;
  const [addressState, setAddressState] =
    useState<typeof initialAddress>(initialAddress);
  const [isComplete, setIsComplete] = useState(false);
  const [researchRecoilState, setResearchRecoilState] =
    useRecoilState(researchSecondState);

  useEffect(() => {
    // ref를 위해 적용
    setIsLoading(false);
  }, []);

  const frameCloseClick = () => {
    setIsOpen(false);
  };

  const frameOpenClick = () => {
    setAddressState(() => initialAddress);
    setIsComplete(() => false);
    new daum.Postcode({
      oncomplete: function (data: SearchAddressData) {
        console.log(data);
        const {
          userSelectedType,
          roadAddress,
          jibunAddress,
          bname,
          buildingName,
          apartment,
          zonecode,
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
            extraAddr,
          }));
        } else {
          setAddressState((prev) => ({
            ...prev,
            userSelectedType,
            jibunAddress,
            zonecode,
          }));
        }

        setIsOpen(() => false);
        setIsComplete(() => true);
      },

      onresize: function (size: SearchResize) {
        searchFrame.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%',
    }).embed(searchFrame);

    setIsOpen(() => true);
  };

  const handleSubmitClick = () => {
    if (addressState.userSelectedType) {
      setResearchRecoilState(() => ({ ...addressState }));
      router.push(PAGE_ROUTE.RESULT);
    }
  };

  return (
    <>
      <NextHead title='두번째' />
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' />

      <div>
        <div>
          <StyledAddressWrapper onClick={frameOpenClick}>
            <div>
              {addressState.userSelectedType === '' ? (
                '눌러서 아파트 검색!'
              ) : addressState.userSelectedType === 'R' ? (
                <>
                  <div>{addressState.roadAddress}</div>
                  <div>{addressState.extraAddr}</div>
                </>
              ) : (
                <div>{addressState.jibunAddress}</div>
              )}
            </div>
          </StyledAddressWrapper>
        </div>

        <StyledFrameContainer>
          <StyledFrameWrapper
            ref={searchFrameRef}
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <StyledExitImg
              src='//t1.daumcdn.net/postcode/resource/images/close.png'
              id='btnFoldWrap'
              onClick={frameCloseClick}
              alt='접기 버튼'
            />
          </StyledFrameWrapper>
        </StyledFrameContainer>
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
              >
                다음으로
              </StyledMotionButton>
            </StyleButtonWrapper>
          )}
        </div>
      </div>
    </>
  );
};

const StyledAddressWrapper = styled.div`
  height: 50px;
  background-color: #ddd;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const StyledFrameContainer = styled.div``;

const StyledFrameWrapper = styled.div`
  display: none;
  border: 1px solid;
  width: 500px;
  height: 466px;
  margin: 5px 0;
  position: relative;
  min-height: 400px;
  max-height: 500px;
  @media screen and (max-width: 400px) {
    width: 90%;
  }
`;

const StyledExitImg = styled.img`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: -1px;
  z-index: 1;
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

export default ResearchSecondPage;
