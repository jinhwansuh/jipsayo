import { useRouter } from 'next/router';
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Portal } from '~/components/common';
import { FilterState, LocationState } from '~/types/house';
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
  const [filterState, setFilterState] = useState<FilterState>({
    cost: '600000',
    time: '',
  });

  const handleCloseClick = useCallback(() => {
    setFilterModalOpen(false);
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFilterClick = useCallback(() => {
    const { cost, time } = filterState;

    if (cost && time) {
      router.push({
        pathname: PAGE_ROUTE.RESULT,
        query: {
          latitude: locationState.latitude,
          longitude: locationState.longitude,
          cost: filterState.cost,
          time: filterState.time,
        },
      });
      setFilterModalOpen(false);
    }
  }, [locationState, filterState]);

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
                <FilterModalContent
                  handleInputChange={handleInputChange}
                  filterState={filterState}
                />
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
