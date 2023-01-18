import { memo } from 'react';
import styled from 'styled-components';

interface Props {
  handleCloseClick: () => void;
}

const FilterModalHeader = ({ handleCloseClick }: Props) => {
  return (
    <StyledHeaderWrapper>
      <StyledCloseButton onClick={handleCloseClick}>close</StyledCloseButton>
      <StyledTitleText>필터</StyledTitleText>
    </StyledHeaderWrapper>
  );
};

const StyledHeaderWrapper = styled.header`
  min-height: 48px;
  border-bottom: 1px solid rgb(235, 235, 235);
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.padding.modal_default_top_bottom}
    ${(props) => props.theme.padding.modal_default_left_right};
  padding-bottom: 0;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  left: ${(props) => props.theme.padding.modal_default_left_right};
`;

const StyledTitleText = styled.h2`
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export default memo(FilterModalHeader);
