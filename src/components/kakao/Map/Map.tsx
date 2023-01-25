import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import styled from 'styled-components';
import { FetchFilteredHouseDate, LocationState } from '~/types/house';

interface Props {
  locationState: LocationState;
  filteredHouseState: FetchFilteredHouseDate[];
}

const KakaoMap = ({ locationState, filteredHouseState }: Props) => {
  const router = useRouter();
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [, setCenterMarker] = useState<any>();
  const [, setMarkers] = useState<any[]>([]);
  const [, setPrevCenter] = useState<any>();
  const query = router.query;

  useEffect(() => {
    const kakaomapCurrent = kakaoMapRef.current;
  }, []);

  useEffect(() => {
    if (isEmpty(query)) return;
  }, [query]);

  // init map 정의
  useEffect(() => {
    if (kakaoMapRef && kakaoMapRef.current) {
      kakao.maps.load(() => {
        const container = kakaoMapRef.current;
        const options = {
          center: new kakao.maps.LatLng(
            locationState.latitude,
            locationState.longitude,
          ),
          level: 5,
        };

        const map = new kakao.maps.Map(container, options);

        setKakaoMap(map);

        // 확대 축소 true, false
        // map.setZoomable(false);
        // 이동 true, false
        // map.setDraggable(true);
      });
    }
  }, [kakaoMapRef]);

  // 지도의 중심이 바뀌었을 때,
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const markerPosition = new kakao.maps.LatLng(
      locationState.latitude,
      locationState.longitude,
    );

    setCenterMarker((prev: any) => {
      if (prev) prev.setMap(null);
      return new kakao.maps.Marker({ map: kakaoMap, position: markerPosition });
    });

    setPrevCenter(markerPosition);

    kakaoMap.setLevel(5);
    kakaoMap.relayout();
    kakaoMap.setCenter(markerPosition);
  }, [kakaoMap, locationState]);

  // 필터링된 데이터가 바뀌었을 때,
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const positions = filteredHouseState.map(
      (state) => new kakao.maps.LatLng(state.latitude, state.longitude),
    );

    setMarkers((markers: any[]) => {
      markers.forEach((marker) => marker.setMap(null));
      return positions.map(
        (position) => new kakao.maps.Marker({ map: kakaoMap, position }),
      );
    });

    if (positions.length > 0) {
      setPrevCenter((prev: any) => {
        positions.push(prev);
        return prev;
      });
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds(),
      );

      kakaoMap.setBounds(bounds);
    } else {
      // filter정보가 초기화 되었을 때,
      setPrevCenter((prev: any) => {
        kakaoMap.setLevel(5);
        kakaoMap.relayout();
        kakaoMap.setCenter(prev);
        return prev;
      });
    }
  }, [kakaoMap, filteredHouseState]);

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
