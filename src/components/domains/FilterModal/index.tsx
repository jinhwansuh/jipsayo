import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Portal } from '~/components/common';

interface Props {
  filterModalOpen: boolean;
  setFilterModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterModal = ({ filterModalOpen, setFilterModalOpen }: Props) => {
  const handleCloseClick = useCallback(() => {
    setFilterModalOpen(false);
  }, []);

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
                <div>
                  <button onClick={handleCloseClick}>close</button>
                </div>
                <div>filter</div>
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
  height: 100vh;
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
  padding: 20px 30px 0 30px;
`;

export default memo(FilterModal);
