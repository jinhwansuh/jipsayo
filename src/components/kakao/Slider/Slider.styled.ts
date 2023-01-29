import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const StyledRangeWrapper = styled.div`
  position: relative;
  height: 10px;
`;

export const StyledRange = styled.div`
  background: #e5e8eb;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.input.track_border_radius};
`;

export const StyledTrack = styled.div`
  position: absolute;
  height: 100%;
  background: ${(props) => props.theme.color.blue_default};
  will-change: left, right;
  border-radius: 5px;
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  top: -4px;
`;

export const StyledInput = styled.input`
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

export const StyledStateWrapper = styled.div`
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
  font-size: 16px;
  margin: 10px 0;
  padding-bottom: 10px;
`;
