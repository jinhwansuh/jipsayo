import styled from 'styled-components';
import { HouseData } from '~/types/house';
import HouseDetail from './HouseDetail';

interface Props {
  houseState: HouseData;
}

const HasHouseData = ({ houseState }: Props) => {
  return (
    <StyledContainer>
      <HouseDetail houseState={houseState} />
      <StyledImageWrapper>이미지</StyledImageWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledImageWrapper = styled.div``;

export default HasHouseData;
