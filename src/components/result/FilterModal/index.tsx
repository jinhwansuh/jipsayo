import { useRouter } from 'next/router';
import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Portal } from '~/components/common';
import { LocationState } from '~/types/house';
import { PAGE_ROUTE } from '~/constants';
import FilterModalContent from './Content';
import FilterModalFooter from './Footer';
import FilterModalHeader from './Header';

interface Props {
  filterModalOpen: boolean;
  setFilterModalOpen: Dispatch<SetStateAction<boolean>>;
  locationState: LocationState;
}

const FilterModal = ({
  filterModalOpen,
  setFilterModalOpen,
  locationState,
}: Props) => {
  const router = useRouter();

  const handleCloseClick = useCallback(() => {
    setFilterModalOpen(false);
  }, []);

  const handleFilterClick = useCallback(() => {
    router.push({
      pathname: PAGE_ROUTE.RESULT,
      query: {
        ...router.query,
        latitude: locationState.latitude,
        longitude: locationState.longitude,
        cost: 567,
        time: 23,
      },
    });
    setFilterModalOpen(false);
  }, [locationState]);

  return (
    <>
      {filterModalOpen && (
        <Portal>
          <ModalContainer>
            <StyledMotion
              initial={{ x: 0, y: 400, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
            >
              <ModalWrapper>
                <FilterModalHeader handleCloseClick={handleCloseClick} />
                <FilterModalContent />
                <FilterModalFooter handleFilterClick={handleFilterClick} />
              </ModalWrapper>
            </StyledMotion>
          </ModalContainer>
        </Portal>
      )}
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 8000;
`;

const StyledMotion = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ModalWrapper = styled.div`
  position: absolute;
  bottom: 0;
  max-width: ${(props) => props.theme.width.default_global_width};
  width: 100%;
  height: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 30px 30px 0 0;
`;

export default memo(FilterModal);
