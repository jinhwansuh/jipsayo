import styled from 'styled-components';
import { HouseData } from '~/types/house';
import HouseDetail from './HouseDetail';
import HouseResultImage from './HouseResultImage';

interface Props {
  houseState: HouseData;
}

const HasHouseData = ({ houseState }: Props) => {
  return (
    <StyledContainer>
      <HouseDetail houseState={houseState} />
      <HouseResultImage estimateYear={houseState.estimateTimeArray[0]} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default HasHouseData;
