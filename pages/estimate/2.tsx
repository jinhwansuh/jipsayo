import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '~/components/Header';
import NextHead from '~/components/NextHead';
import { SearchAddressData, SearchResize } from '~/types/house';
import { initialAddress } from '~/utils/house';

const EstimateSecondPage = () => {
  const searchBlockRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchBlock = searchBlockRef.current as HTMLDivElement;

  const [addressState, setAddressState] =
    useState<typeof initialAddress>(initialAddress);

  useEffect(() => {
    // ref를 위해 적용
    setIsLoading(false);
  }, []);

  const frameCloseClick = () => {
    setIsOpen(false);
  };
  const frameOpenClick = () => {
    setAddressState(initialAddress);
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
        } = data;

        let extraAddr = '';

        if (userSelectedType === 'R') {
          setAddressState((prev) => ({ ...prev, roadAddress, zonecode }));
        } else {
          setAddressState((prev) => ({ ...prev, jibunAddress, zonecode }));
        }

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
          // 조합된 참고항목을 해당 필드에 넣는다.

          setAddressState((prev) => ({ ...prev, userSelectedType, extraAddr }));
        }

        setIsOpen(() => false);
      },

      onresize: function (size: SearchResize) {
        searchBlock.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%',
    }).embed(searchBlock);

    setIsOpen(() => true);
  };

  const handleSubmitClick = () => {
    console.log(123);
  };
  return (
    <>
      <NextHead title='두번째' />
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' />
      <Header />
      <button onClick={frameOpenClick}>아파트 찾기</button>
      <div>
        {addressState.userSelectedType === 'R'
          ? addressState.roadAddress + addressState.extraAddr
          : addressState.jibunAddress}
      </div>
      <div>
        {/* <input type='text' id='sample3_postcode' placeholder='우편번호' />
        <input type='button' onClick={frameOpenClick} value='우편번호 찾기' /> */}
        {/* <input type='text' id='sample3_address' placeholder='주소' />
        <input type='text' id='sample3_detailAddress' placeholder='상세주소' />
        <input type='text' id='sample3_extraAddress' placeholder='참고항목' /> */}
        <StyledFrameWrapper
          ref={searchBlockRef}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <StyledExitImg
            src='//t1.daumcdn.net/postcode/resource/images/close.png'
            id='btnFoldWrap'
            onClick={frameCloseClick}
            alt='접기 버튼'
          />
        </StyledFrameWrapper>
      </div>

      <button onClick={handleSubmitClick}> 다음으로 </button>
    </>
  );
};

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

export default EstimateSecondPage;

// https://postcode.map.daum.net/guide
