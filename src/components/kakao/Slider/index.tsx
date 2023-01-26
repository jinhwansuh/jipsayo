import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Remixicon } from '~/components/common';
import { FilterState } from '~/types/house';
import { calculateCostToWon } from '~/utils/functions/house';

// left보다 translateX를 사용하는 것이 더 부드럽다. (모바일 환경)
// https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

interface Props {
  minValue?: number;
  maxValue?: number;
  step?: number;
  gap?: number;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterState: FilterState;
}

const Slider = ({
  minValue = 0,
  maxValue = 600000,
  gap = 50000,
  step = 10000,
  filterState,
  handleInputChange,
}: Props) => {
  const [minState, setMinState] = useState(minValue);
  const [maxState, setMaxState] = useState(
    Number(filterState.cost) || maxValue,
  );
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
        {/* 현재 버전은 최소값 수정 불가능 */}
        <StyledMinInput
          type='range'
          min={minValue}
          max={maxValue}
          value={minState}
          onChange={handleMinInputChange}
          step={step}
          disabled={true}
        />
        <StyledMaxInput
          type='range'
          name='cost'
          min={minValue}
          max={maxValue}
          value={maxState}
          onChange={handleMaxInputChange}
          step={step}
        />
      </StyledInputWrapper>

      <StyledStateWrapper>
        <StyledState>
          {priceState.left}
          <Remixicon iconName='ri-forbid-line' size='100%' color='red' />
        </StyledState>
        <StyledState>{priceState.right}</StyledState>
      </StyledStateWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const StyledRangeWrapper = styled.div`
  position: relative;
  height: 10px;
`;

const StyledRange = styled.div`
  background: #e5e8eb;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.input.track_border_radius};
`;

const StyledTrack = styled.div`
  position: absolute;
  height: 100%;
  background: ${(props) => props.theme.color.green};
  will-change: left, right;
  border-radius: 5px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  top: -4px;
`;

const StyledMaxInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  height: 100%;
  width: 100%;
  background: transparent;
  padding: 0;
  pointer-events: none;
  cursor: pointer;
  left: -0.5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 100%;
    background-color: #0f2957;
    box-shadow: 0 0 0 1px rgba(0, 27, 55, 0.1),
      0 8px 8px 0 rgba(0, 29, 58, 0.18), 0 2px 3px 0 rgba(0, 29, 58, 0.18);
    border: none;
    pointer-events: auto;
  }

  &:focus {
    outline: none;
  }
`;

const StyledMinInput = styled(StyledMaxInput)`
  &::-webkit-slider-thumb {
    background-color: #bbb;
  }
`;

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

export default Slider;
