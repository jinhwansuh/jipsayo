import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ latitude, longitude }: Props) => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaomapCurrent = kakaoMapRef.current;
  }, []);

  useEffect(() => {
    if (kakaoMapRef && kakaoMapRef.current) {
      kakao.maps.load(() => {
        const container = kakaoMapRef.current;
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };

        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }
  }, [kakaoMapRef]);

  return <StyledMap ref={kakaoMapRef} />;
};

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
`;

export default KakaoMap;
