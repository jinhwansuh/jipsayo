import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 296px;
  height: 48px;
  border: 2px solid #ffffff;
  border-radius: 20px;
  background: ${(props) => props.theme.color.button_select};
  color: #ffffff;
  padding: 13px 23px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background: ${(props) => props.theme.color.blue_default};
  }
`;
