import { Ref } from 'react';
import styled from 'styled-components';

interface Props {
  position?: string;
  isOpen: boolean;
  searchFrameRef: Ref<HTMLDivElement>;
  frameCloseClick: () => void;
}

const DaumPostFrame = ({ isOpen, searchFrameRef, frameCloseClick }: Props) => {
  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 1000;
`;

const StyledFrameWrapper = styled.div`
  display: none;
  border: 1px solid;
  width: 500px;
  height: 466px;
  position: relative;
  min-height: 400px;
  max-height: 500px;
  @media screen and (max-width: 500px) {
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

export default DaumPostFrame;
