import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isEmpty, isNull, isString } from 'lodash-es';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { DaumPostFrame, Remixicon } from '~/components/common';
import { FetchFilteredHouseDate, FetchFilterRequest } from '~/types/house';
import { KakaoMapAddressResponse, KakaoMapAddressStatus } from '~/types/kakao';
import { getFilteredHouses } from '~/api/house';
import { fetchFilteredHouseAtom, houseStateSelector } from '~/atoms/house';
import { PAGE_ROUTE } from '~/constants';
import { useDaumPost } from '~/hooks';
import MapHeader from './Header';
import KakaoMap from './Map';

const KakaoMapContainer = () => {
  const router = useRouter();
  const query = router.query;
  const houseRecoilState = useRecoilValue(houseStateSelector);
  const [locationState, setLocationState] = useState({
    latitude: houseRecoilState.latitude || 33.45,
    longitude: houseRecoilState.longitude || 126.57,
  });
  const searchFrameRef = useRef(null);
  const { isOpen, frameOpenClick, frameCloseClick, isComplete, addressState } =
    useDaumPost({
      searchFrameRef,
    });
  const setFilteredHouseRecoilState = useSetRecoilState(fetchFilteredHouseAtom);
  const [filteredHouseState, setFilteredHouseState] = useState<
    FetchFilteredHouseDate[]
  >([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchSearchNewHouse = async () => {
    // 주소로 위도 경도를 받아온다
    const { roadAddress } = addressState;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      roadAddress,
      function (
        result: KakaoMapAddressResponse[],
        status: KakaoMapAddressStatus,
      ) {
        if (status === kakao.maps.services.Status.OK) {
          router.push({
            pathname: PAGE_ROUTE.RESULT,
            query: {
              latitude: result[0].y,
              longitude: result[0].x,
            },
          });
        }
      },
    );
  };

  const fetchFilterHouses = async ({
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
    if (isNull(data.errors)) {
      // data.errors가 없다면 성공
      if (isEmpty(data.data)) {
        // No Data
      } else {
        setFilteredHouseState([...data.data]);
        setFilteredHouseRecoilState([...data.data]);
        setIsFiltered(true);
      }
    }
  };

  const handleClearFilter = useCallback(() => {
    // TODO: replace, push 둘 중에 어떤 것을 적용해야할지 고민
    router.push({
      pathname: PAGE_ROUTE.RESULT,
    });
    setFilteredHouseState([]);
    setIsFiltered(false);
  }, []);

  useEffect(() => {
    // 새로운 주소를 검색했을 때,
    if (isComplete) {
      setFilteredHouseState([]);
      fetchSearchNewHouse();
    }
  }, [isComplete]);

  useEffect(() => {
    const latitude = query['latitude'];
    const longitude = query['longitude'];
    const cost = query['cost'];
    const time = query['time'];

    // 주소값만 바뀌었을 때,
    if (isString(latitude) && isString(longitude)) {
      setLocationState({
        latitude: +latitude,
        longitude: +longitude,
      });
      setIsFiltered(false);
    }

    // 필터가 적용되었을 때,
    if (
      isString(latitude) &&
      isString(longitude) &&
      isString(cost) &&
      isString(time)
    ) {
      fetchFilterHouses({ latitude, longitude, cost, time });
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

      {isFiltered && (
        <StyledSetFilterCloseButton onClick={handleClearFilter}>
          <Remixicon iconName='ri-filter-off-line' size='100%' />
          clear filter
        </StyledSetFilterCloseButton>
      )}

      <KakaoMap
        locationState={locationState}
        filteredHouseState={filteredHouseState}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100% - ${(props) => props.theme.height.kakao_map_header});
  z-index: 7000;
  max-width: ${(props) => props.theme.width.default_global_width};
`;

const StyledSetFilterCloseButton = styled.button`
  position: absolute;
  z-index: 8000;
  top: calc(${(props) => props.theme.height.kakao_map_header} + 15px);
  left: 50%;
  transform: translate(-50%, 0);
  border: none;
  /* width: 90px; */
  height: 35px;
  border-radius: 20px;
  background: #ffffff;
  font-size: 15px;
  padding: 5px 12px;
`;

export default KakaoMapContainer;
