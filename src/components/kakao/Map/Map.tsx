import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FetchFilteredHouseDate, LocationState } from '~/types/house';
import { KAKAO_URL } from '~/constants';

interface Props {
  locationState: LocationState;
  filteredHouseState: FetchFilteredHouseDate[];
}

const KakaoMap = ({ locationState, filteredHouseState }: Props) => {
  const router = useRouter();
  const { pathname } = router;
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [centerMarker, setCenterMarker] = useState<any>();
  const [, setMarkers] = useState<any[]>([]);
  const [, setPrevCenter] = useState<any>();
  const [, setClickedMarker] = useState<any>();

  useEffect(() => {
    const kakaomapCurrent = kakaoMapRef.current;
  }, []);

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

        kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
          const latlng = mouseEvent.latLng;

          const latitude = latlng.getLat();
          const longitude = latlng.getLng();

          router.push({
            pathname: pathname,
            query: {
              latitude,
              longitude,
            },
          });
        });
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

    setPrevCenter(() => markerPosition);

    // 마커 이미지를 생성
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(
      KAKAO_URL.CENTER_IMAGE,
      imageSize,
    );

    const marker = new kakao.maps.Marker({
      map: kakaoMap,
      position: markerPosition,
      image: markerImage,
    });

    if (centerMarker) {
      centerMarker.setMap(null);
    }

    setCenterMarker(marker);

    marker.setMap(kakaoMap);
    kakaoMap.setCenter(markerPosition);
  }, [kakaoMap, locationState]);

  // 필터링된 데이터가 바뀌었을 때,
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    setMarkers((markers: any[]) => {
      markers.forEach((marker) => marker.setMap(null));
      return [];
    });

    const positions = filteredHouseState.map((state) => {
      const position = new kakao.maps.LatLng(state.latitude, state.longitude);
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position,
        clickable: true,
      });

      setMarkers((prev) => [...prev, marker]);

      const iwContent =
        `<div style="padding:5px;">` +
        `<div>${state.danjiName}</div>` +
        `<div>${state.jibunAddress}</div>` +
        `</div>`;
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        setClickedMarker((prevInfoWindow: any) => {
          // 이전 open된 값이 있다면 close
          if (prevInfoWindow) prevInfoWindow.close();
          infowindow.open(kakaoMap, marker);
          return infowindow;
        });
      });

      return position;
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
