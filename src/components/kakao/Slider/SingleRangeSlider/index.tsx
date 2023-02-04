import { ChangeEvent, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FilterTimeState } from '~/types/house';
import {
  StyledContainer,
  StyledInput,
  StyledInputWrapper,
  StyledRange,
  StyledRangeWrapper,
  StyledTrack,
} from '../Slider.styled';

interface Props {
  maxValue: number;
  step: number;
  timeState: FilterTimeState;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SingleRangeSlider = ({ maxValue, step, timeState, onChange }: Props) => {
  const [valueState, setValueState] = useState(Number(timeState.time));
  const [rightProgress, setRightProgress] = useState(
    100 - (valueState / maxValue) * 100,
  );

  const handleValueInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const percent = 100 - (value / maxValue) * 100;
      setValueState(value);
      setRightProgress(percent);
      onChange(e);
    },
    [],
  );

  return (
    <StyledContainer>
      <StyledRangeWrapper>
        <StyledRange>
          <StyledTrack style={{ left: `0%`, right: `${rightProgress}%` }} />
        </StyledRange>
      </StyledRangeWrapper>

      <StyledInputWrapper>
        <StyledInput
          type='range'
          name='time'
          min={0}
          max={maxValue}
          value={valueState}
          onChange={handleValueInputChange}
          step={step}
        />
      </StyledInputWrapper>

      <StyledStateWrapper>{valueState}분 이내</StyledStateWrapper>
    </StyledContainer>
  );
};

const StyledStateWrapper = styled.div`
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
  font-size: 16px;
  margin: 10px 0;
  padding-bottom: 10px;
`;

export default memo(SingleRangeSlider);
