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
import {
  FetchFilterRequest,
  FilterPriceState,
  FilterTimeState,
  LocationState,
} from '~/types/house';
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
  const { pathname } = router;
  const [priceState, setPriceState] = useState<FilterPriceState>({
    minPrice: '0',
    maxPrice: '600000',
  });
  const [timeState, setTimeState] = useState<FilterTimeState>({
    time: '50',
  });

  const handleCloseClick = useCallback(() => {
    setFilterModalOpen(false);
  }, []);

  const handlePriceInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPriceState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleTimeInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTimeState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleFilterClick = useCallback(() => {
    const { maxPrice, minPrice } = priceState;
    const { time } = timeState;
    const queryString: FetchFilterRequest = {
      latitude: String(locationState.latitude),
      longitude: String(locationState.longitude),
      lowCost: minPrice,
      highCost: maxPrice,
      time: time,
    };

    if (maxPrice && time) {
      router.push({
        pathname: pathname,
        query: {
          latitude: queryString.latitude,
          longitude: queryString.longitude,
          lowCost: queryString.lowCost,
          highCost: queryString.highCost,
          time: time,
        },
      });
      setFilterModalOpen(false);
    }
  }, [locationState, priceState, timeState]);

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
                  handlePriceInputChange={handlePriceInputChange}
                  handleTimeInputChange={handleTimeInputChange}
                  priceState={priceState}
                  timeState={timeState}
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
