import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import styled from 'styled-components';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
}

const KakaoMap = ({ location }: Props) => {
  const router = useRouter();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [mapOptions, setMapOptions] = useState({
    location,
    level: 5,
  });
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const query = router.query;

  useEffect(() => {
    const kakaomapCurrent = kakaoMapRef.current;
  }, []);

  useEffect(() => {
    if (isEmpty(query)) return;
  }, [query]);

  useEffect(() => {
    if (kakaoMapRef && kakaoMapRef.current) {
      kakao.maps.load(() => {
        const container = kakaoMapRef.current;
        const options = {
          center: new kakao.maps.LatLng(
            mapOptions.location.latitude,
            mapOptions.location.longitude,
          ),
          level: mapOptions.level,
        };

        const map = new kakao.maps.Map(container, options);
        setKakaoMap(map);

        // 확대 축소 true, false
        // map.setZoomable(false);

        // 이동 true, false
        // map.setDraggable(true);
        kakao.maps.event.addListener(map, 'dragend', function () {
          // console.log('드래그 이동');
        });
      });
    }
  }, [kakaoMapRef]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    setMapOptions((prev) => ({ ...prev, location }));

    const markerPosition = new kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    kakaoMap.relayout();
    kakaoMap.setCenter(markerPosition);
    marker.setMap(kakaoMap);
  }, [kakaoMap, location]);

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

export default KakaoMap;
