import { Dispatch, memo, SetStateAction } from 'react';
import styled from 'styled-components';
import { Portal } from '~/components/common';

interface Props {
  filterModalOpen: boolean;
  setFilterModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterModal = ({ filterModalOpen, setFilterModalOpen }: Props) => {
  const handleCloseClick = () => {
    setFilterModalOpen(false);
  };

  return (
    <>
      {filterModalOpen && (
        <Portal>
          <ModalContainer>
            <ModalWrapper>
              <div>asdf</div>
              <button onClick={handleCloseClick}>ddd</button>
            </ModalWrapper>
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

const ModalWrapper = styled.div`
  max-width: ${(props) => props.theme.width.default_global_width};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

export default memo(FilterModal);
