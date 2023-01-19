import styled from 'styled-components';
import { initialAddress } from '~/utils/house';

interface Props {
  frameOpenClick: () => void;
  addressState: typeof initialAddress;
}

const DynamicSearchAddress = ({ frameOpenClick, addressState }: Props) => {
  return (
    <StyledInputWrapper onClick={frameOpenClick}>
      {addressState.userSelectedType === '' ? (
        <StyledAlertText>주소 입력 ( ex, 압구정 현대아파트 )</StyledAlertText>
      ) : addressState.userSelectedType === 'R' ? (
        <>
          <div>{addressState.roadAddress}</div>
          <div>{addressState.extraAddr}</div>
        </>
      ) : (
        <div>{addressState.jibunAddress}</div>
      )}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50px;
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
`;

const StyledAlertText = styled.div`
  font-size: 18px;
`;

export default DynamicSearchAddress;
