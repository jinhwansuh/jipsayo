import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { isEmpty, isNull, isString } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DaumPostFrame } from '~/components/common';
import { FetchFilterRequest, FilteredFetchHouseDate } from '~/types/house';
import { KakaoMapAddressResponse, KakaoMapAddressStatus } from '~/types/kakao';
import { getFilteredHouses } from '~/api/house';
import { houseState } from '~/atoms/house';
import { useDaumPost } from '~/hooks';
import MapHeader from './Header';
import KakaoMap from './Map';

const KakaoMapContainer = () => {
  const router = useRouter();
  const query = router.query;
  const houseRecoilState = useRecoilValue(houseState);
  const [locationState, setLocationState] = useState({
    latitude: houseRecoilState.latitude || 33.45,
    longitude: houseRecoilState.longitude || 126.57,
  });
  const searchFrameRef = useRef(null);
  const { isOpen, frameOpenClick, frameCloseClick, isComplete, addressState } =
    useDaumPost({
      searchFrameRef,
    });
  const [filteredHouseData, setFilteredHouseData] = useState<
    FilteredFetchHouseDate[]
  >([]);

  const handleSearchNewHouse = async () => {
    const { roadAddress } = addressState;
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      roadAddress,
      function (
        result: KakaoMapAddressResponse[],
        status: KakaoMapAddressStatus,
      ) {
        if (status === kakao.maps.services.Status.OK) {
          setLocationState({
            latitude: +result[0].y,
            longitude: +result[0].x,
          });
        }
      },
    );
  };

  const handleFetchFilterHouse = async ({
    latitude,
    longitude,
    cost,
    time,
  }: FetchFilterRequest) => {
    const { data } = await getFilteredHouses({
      latitude,
      longitude,
      cost,
      time,
    });
    console.log(data);
    if (isNull(data.errors)) {
      if (isEmpty(data.data)) {
        // No Data
      } else {
        setFilteredHouseData([...data.data]);
      }
    }
  };
  useEffect(() => {
    if (isComplete) {
      handleSearchNewHouse();
    }
  }, [isComplete]);

  useEffect(() => {
    const latitude = query['latitude'];
    const longitude = query['longitude'];
    const cost = query['cost'];
    const time = query['time'];

    if (
      isString(latitude) &&
      isString(longitude) &&
      isString(cost) &&
      isString(time)
    ) {
      handleFetchFilterHouse({ latitude, longitude, cost, time });
    }
  }, [query]);

  return (
    <StyledContainer>
      <MapHeader
        frameOpenClick={frameOpenClick}
        addressState={addressState}
        isComplete={isComplete}
        locationState={locationState}
      />
      <DaumPostFrame
        isOpen={isOpen}
        searchFrameRef={searchFrameRef}
        frameCloseClick={frameCloseClick}
        position={'absolute'}
      />
      <KakaoMap location={locationState} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100% - 86px);
  z-index: 7000;
  max-width: ${(props) => props.theme.width.default_global_width};
`;

export default KakaoMapContainer;
