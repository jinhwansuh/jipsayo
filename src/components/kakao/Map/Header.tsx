import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Remixicon } from '~/components/common';
import { LocationState } from '~/types/house';
import { initialAddress } from '~/utils/house';
import FilterModal from '../FilterModal';

interface Props {
  frameOpenClick: () => void;
  addressState: typeof initialAddress;
  isComplete: boolean;
  locationState: LocationState;
}

const MapHeader = ({
  frameOpenClick,
  addressState,
  isComplete,
  locationState,
}: Props) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleFilterButtonClick = useCallback(() => {
    setFilterModalOpen(true);
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledWrapper>
          <StyledHeader>
            <StyledAddressSearch onClick={frameOpenClick}>
              {isComplete
                ? addressState.jibunAddress
                  ? addressState.jibunAddress
                  : addressState.roadAddress
                : '목적지 검색'}
            </StyledAddressSearch>
            <StyledFilterButton onClick={handleFilterButtonClick}>
              <Remixicon iconName='ri-equalizer-line' size='24px' />
            </StyledFilterButton>
          </StyledHeader>
        </StyledWrapper>
      </StyledContainer>

      <FilterModal
        filterModalOpen={filterModalOpen}
        setFilterModalOpen={setFilterModalOpen}
        locationState={locationState}
      />
    </>
  );
};

const StyledContainer = styled.div`
  position: relative;
  height: ${(props) => props.theme.height.kakao_map_header};
  background: #fff;
  box-shadow: 0 8px 6px -8px black;
  z-index: 2;
`;

const StyledWrapper = styled.div`
  padding: 5px 24px 5px 24px;
`;

const StyledHeader = styled.div`
  min-height: 56px;
  min-width: 285px;
  background: #f7f7f7;
  border-radius: 1000px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAddressSearch = styled.div`
  flex: 1;
`;

const StyledFilterButton = styled.div`
  cursor: pointer;
`;

export default memo(MapHeader);
