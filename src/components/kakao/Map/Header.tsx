import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FilterModal } from '~/components/domains';
import { initialAddress } from '~/utils/house';

interface Props {
  frameOpenClick: () => void;
  addressState: typeof initialAddress;
  isComplete: boolean;
}

const MapHeader = ({ frameOpenClick, addressState, isComplete }: Props) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleFilterClick = useCallback(() => {
    setFilterModalOpen(true);
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledWrapper>
          <StyledHeader>
            <div onClick={frameOpenClick}>
              {isComplete
                ? addressState.jibunAddress
                  ? addressState.jibunAddress
                  : addressState.roadAddress
                : '목적지 검색'}
            </div>
            <button onClick={handleFilterClick}>filter open</button>
          </StyledHeader>
        </StyledWrapper>
      </StyledContainer>

      <FilterModal
        filterModalOpen={filterModalOpen}
        setFilterModalOpen={setFilterModalOpen}
      />
    </>
  );
};

const StyledContainer = styled.div`
  position: relative;
  height: 86px;
  background: #fff;
  padding-bottom: 16px;
  box-shadow: 0 8px 6px -8px black;
  z-index: 2;
`;

const StyledWrapper = styled.div`
  padding: 14px 24px 0 24px;
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

export default memo(MapHeader);
