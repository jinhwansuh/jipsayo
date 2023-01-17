import { useRef } from 'react';
import styled from 'styled-components';
import { DaumPostFrame } from '~/components/domains';
import { useDaumPost } from '~/hooks';
import MapHeader from './Header';
import KakaoMap from './Map';

interface Props {
  latitude: number;
  longitude: number;
}

const KakaoMapContainer = ({ latitude, longitude }: Props) => {
  const searchFrameRef = useRef(null);
  const { isOpen, frameOpenClick, frameCloseClick, isComplete, addressState } =
    useDaumPost({
      searchFrameRef,
    });

  return (
    <StyledContainer>
      <MapHeader
        frameOpenClick={frameOpenClick}
        addressState={addressState}
        isComplete={isComplete}
      />
      <DaumPostFrame
        isOpen={isOpen}
        searchFrameRef={searchFrameRef}
        frameCloseClick={frameCloseClick}
        position={'absolute'}
      />
      <KakaoMap latitude={latitude} longitude={longitude} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100vh - 86px);
  z-index: 7000;
  max-width: ${(props) => props.theme.width.default_global_width};
`;

export default KakaoMapContainer;
