import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FilterModal } from '~/components/domains';

const MapHeader = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const handleFilterClick = useCallback(() => {
    setFilterModalOpen(true);
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledWrapper>
          <StyledHeader>
            <div>filter button</div>
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
`;

export default memo(MapHeader);
