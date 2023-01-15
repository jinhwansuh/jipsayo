import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ latitude, longitude }: Props) => {
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [mapOptions, setMapOptions] = useState({
    latlng: {
      latitude,
      longitude,
    },
    level: 5,
  });
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaomapCurrent = kakaoMapRef.current;
  }, []);

  useEffect(() => {
    if (kakaoMapRef && kakaoMapRef.current) {
      kakao.maps.load(() => {
        const container = kakaoMapRef.current;
        const options = {
          center: new kakao.maps.LatLng(
            mapOptions.latlng.latitude,
            mapOptions.latlng.longitude,
          ),
          level: mapOptions.level,
        };

        const map = new kakao.maps.Map(container, options);
        setKakaoMap(map);

        // 확대 축소 true, false
        map.setZoomable(false);

        const markerPosition = new kakao.maps.LatLng(
          mapOptions.latlng.latitude,
          mapOptions.latlng.longitude,
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 이동 true, false
        map.setDraggable(true);
        kakao.maps.event.addListener(map, 'dragend', function () {
          console.log('드래그 이동');
        });
      });
    }
  }, [kakaoMapRef]);

  // useEffect(() => {
  //   if (kakaoMap === null) {
  //     return;
  //   }

  //   const positions = markerData.map((pos) => new kakao.maps.LatLng(...pos));

  //   setMarkers((markers) => {
  //     // clear prev markers
  //     markers.forEach((marker) => marker.setMap(null));

  //     // assign new markers
  //     return positions.map(
  //       (position) => new kakao.maps.Marker({ map: kakaoMap, position }),
  //     );
  //   });

  //   if (positions.length > 0) {
  //     const bounds = positions.reduce(
  //       (bounds, latlng) => bounds.extend(latlng),
  //       new kakao.maps.LatLngBounds(),
  //     );

  //     kakaoMap.setBounds(bounds);
  //   }
  // }, [kakaoMap, markerData]);

  return (
    <Container>
      <StyledMap ref={kakaoMapRef} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
`;

export default memo(KakaoMap);
