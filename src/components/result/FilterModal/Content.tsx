import { ChangeEvent, memo } from 'react';
import styled from 'styled-components';

interface Props {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterModalContent = ({ handleInputChange }: Props) => {
  return (
    <StyledContentContainer>
      <StyledContentWrapper>
        <StyledTitleText>가격</StyledTitleText>
        <input
          name={'cost'}
          type='number'
          onChange={handleInputChange}
          pattern='\\d*'
          inputMode='decimal'
          placeholder={'3000'}
        />
      </StyledContentWrapper>

      <StyledContentWrapper>
        <StyledTitleText>시간</StyledTitleText>
        <input
          name={'time'}
          type='number'
          onChange={handleInputChange}
          pattern='\\d*'
          inputMode='decimal'
          placeholder={'30'}
        />
      </StyledContentWrapper>
    </StyledContentContainer>
  );
};

const StyledContentContainer = styled.div`
  overflow-y: auto;
  height: calc(93% - 64px);
  margin-bottom: calc(64px + 18px);
  padding: 0 ${(props) => props.theme.padding.modal_default_left_right};
`;

const StyledContentWrapper = styled.section`
  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const StyledTitleText = styled.h2`
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StyledMoveSelect = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default memo(FilterModalContent);
