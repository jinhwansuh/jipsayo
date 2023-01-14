import styled from 'styled-components';
import MapHeader from './Header';
import KakaoMap from './Map';

interface Props {
  latitude: number;
  longitude: number;
}

const KakaoMapContainer = ({ latitude, longitude }: Props) => {
  return (
    <StyledContainer>
      <MapHeader />
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
