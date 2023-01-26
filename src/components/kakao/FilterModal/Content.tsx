import { ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import { FilterState } from '~/types/house';
import Slider from '../Slider';

interface Props {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterState: FilterState;
}

const FilterModalContent = ({ handleInputChange, filterState }: Props) => {
  return (
    <StyledContentContainer>
      <StyledContentWrapper>
        <StyledTitleText>가격 범위</StyledTitleText>
        <Slider
          handleInputChange={handleInputChange}
          filterState={filterState}
        />
      </StyledContentWrapper>

      <StyledContentWrapper>
        <StyledTitleText>시간</StyledTitleText>
        <StyledInputWrapper>
          <StyledInput
            name={'time'}
            type={'number'}
            onChange={handleInputChange}
            pattern='\\d*'
            inputMode='decimal'
            placeholder={'30'}
            value={filterState.time}
          />
        </StyledInputWrapper>
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
  position: relative;
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

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
`;

const StyledInput = styled.input`
  // font-size가 16px 아래면 ios에서 자동으로 zoom-in이 된다!
  width: 75%;
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
  &::-webkit-input-placeholder {
    color: #aaa;
  }
  &:-ms-input-placeholder {
    color: #aaa;
  }
`;

export default memo(FilterModalContent);
