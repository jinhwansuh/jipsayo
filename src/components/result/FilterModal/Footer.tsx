import { memo } from 'react';
import styled from 'styled-components';

interface Props {
  handleFilterClick: () => void;
}

const FilterModalFooter = ({ handleFilterClick }: Props) => {
  return (
    <StyledFooterWrapper>
      <StyledFooterButton onClick={handleFilterClick}>
        필터적용
      </StyledFooterButton>
    </StyledFooterWrapper>
  );
};

const StyledFooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 ${(props) => props.theme.padding.modal_default_left_right};
  justify-content: flex-end;
  border-top: 1px solid rgb(235, 235, 235);
  background: #ffffff;
`;

const StyledFooterButton = styled.button`
  background: #888888;
`;

export default memo(FilterModalFooter);
