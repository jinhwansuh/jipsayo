import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { MultiRangeSlider, SingleRangeSlider } from '~/components/kakao';
import { FilterPriceState, FilterTimeState } from '~/types/house';

interface Props {
  handlePriceInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTimeInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  priceState: FilterPriceState;
  timeState: FilterTimeState;
}

const FilterModalContent = ({
  handlePriceInputChange,
  handleTimeInputChange,
  priceState,
  timeState,
}: Props) => {
  return (
    <StyledContentContainer>
      <StyledContentWrapper>
        <StyledTitleText>가격 범위</StyledTitleText>
        <MultiRangeSlider
          minName={'minPrice'}
          maxName={'maxPrice'}
          minValue={0} // 추후 min값을 받게된다면 추가 필요
          maxValue={600000}
          gap={50000}
          step={10000}
          handleInputChange={handlePriceInputChange}
          value={priceState}
        />
      </StyledContentWrapper>

      <StyledContentWrapper>
        <StyledTitleText>시간 (OO분 이내)</StyledTitleText>
        <SingleRangeSlider
          maxValue={120}
          step={2}
          timeState={timeState}
          handleInputChange={handleTimeInputChange}
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

export default FilterModalContent;
