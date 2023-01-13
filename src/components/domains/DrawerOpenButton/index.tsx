import styled from 'styled-components';

interface Props {
  handleDrawerButtonClick: () => void;
  isDrawerOpen: boolean;
}

const DrawerOpenButton = ({ handleDrawerButtonClick, isDrawerOpen }: Props) => {
  return (
    <StyledButtonContainer>
      <StyledButtonWrapper>
        <StyledButton onClick={handleDrawerButtonClick}>
          {isDrawerOpen ? '지도끄기' : '지도보기'}
        </StyledButton>
      </StyledButtonWrapper>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 64px;
  width: calc(100% - ${(props) => props.theme.padding.default_left_right} * 2);
  max-width: 660px;
  z-index: 8000;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  height: 100%;
  width: 88px;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  outline: none;
  margin: 0px;
  padding: 5px 10px;
  color: white;
  background: rgb(67, 77, 135);
`;

export default DrawerOpenButton;
