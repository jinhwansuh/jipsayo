import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { DaumPostFrame } from '~/components/domains';
import { getHouse } from '~/api/house';
import { houseState } from '~/atoms/house';
import { useDaumPost } from '~/hooks';
import MapHeader from './Header';
import KakaoMap from './Map';

const KakaoMapContainer = () => {
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

  const handleFetchHouseData = async () => {
    const { roadAddress, buildingName } = addressState;
    const { data } = await getHouse({
      roadAddress: roadAddress,
      danjiName: buildingName,
    });

    if (isEmpty(data.data)) {
      // noData
    } else {
      setLocationState({
        latitude: +data.data.longitude,
        longitude: +data.data.latitude,
      });

      // latitude: data.data.latitude,
      //   longitude: data.data.longitude,
    }
  };

  useEffect(() => {
    if (isComplete) {
      handleFetchHouseData();
    }
  }, [isComplete]);

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
  height: calc(100vh - 86px);
  z-index: 7000;
  max-width: ${(props) => props.theme.width.default_global_width};
`;

export default KakaoMapContainer;
