import { ChangeEvent, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FilterPriceState } from '~/types/house';
import { calculateCostToWon } from '~/utils/functions/house';
import {
  StyledContainer,
  StyledInput,
  StyledInputWrapper,
  StyledRange,
  StyledRangeWrapper,
  StyledTrack,
} from '../Slider.styled';

// left보다 translateX를 사용하는 것이 더 부드럽다. (모바일 환경)
// https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

interface Props {
  minName: string;
  maxName: string;
  minValue: number;
  maxValue: number;
  step: number;
  gap: number;
  value: FilterPriceState;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MultiRangeSlider = ({
  minName,
  maxName,
  minValue,
  maxValue,
  gap,
  step,
  value,
  handleInputChange,
}: Props) => {
  // string값을 number로 다루기 위해 number state를 생성
  const [minState, setMinState] = useState(Number(value.minPrice));
  const [maxState, setMaxState] = useState(Number(value.maxPrice));

  const [leftProgress, setLeftProgress] = useState((minState / maxValue) * 100);
  const [rightProgress, setRightProgress] = useState(
    100 - (maxState / maxValue) * 100,
  );
  const [priceState, setPriceState] = useState({
    left: calculateCostToWon(minState),
    right: calculateCostToWon(maxState),
  });

  const handleMinInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), maxState - gap);
      const percent = (value / maxValue) * 100;
      setMinState(value);
      setLeftProgress(percent);
      setPriceState((prev) => ({ ...prev, left: calculateCostToWon(value) }));
      handleInputChange(e);
    },
    [maxState],
  );

  const handleMaxInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), minState + gap);
      const percent = 100 - (value / maxValue) * 100;
      setMaxState(value);
      setRightProgress(percent);
      setPriceState((prev) => ({ ...prev, right: calculateCostToWon(value) }));
      handleInputChange(e);
    },
    [minState],
  );

  return (
    <StyledContainer>
      <StyledRangeWrapper>
        <StyledRange>
          <StyledTrack
            style={{ left: `${leftProgress}%`, right: `${rightProgress}%` }}
          />
        </StyledRange>
      </StyledRangeWrapper>

      <StyledInputWrapper>
        <StyledMinInput
          type='range'
          name={minName}
          min={minValue}
          max={maxValue}
          value={minState}
          onChange={handleMinInputChange}
          step={step}
        />
        <StyledMaxInput
          type='range'
          name={maxName}
          min={minValue}
          max={maxValue}
          value={maxState}
          onChange={handleMaxInputChange}
          step={step}
        />
      </StyledInputWrapper>

      <StyledStateWrapper>
        <StyledState>{priceState.left}</StyledState>
        <StyledState>{priceState.right}</StyledState>
      </StyledStateWrapper>
    </StyledContainer>
  );
};

const StyledMaxInput = styled(StyledInput)``;

const StyledMinInput = styled(StyledMaxInput)``;

const StyledStateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 100%;
`;

const StyledState = styled.div`
  height: 100%;
`;

export default memo(MultiRangeSlider);
