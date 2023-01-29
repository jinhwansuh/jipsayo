import styled from 'styled-components';
import { Button } from '~/components/common';
import { HouseData } from '~/types/house';
import HouseDetail from './HouseDetail';
import HouseResultImage from './HouseResultImage';

interface Props {
  houseState: HouseData;
  handleButtonClick: () => void;
}

const HasHouseData = ({ houseState, handleButtonClick }: Props) => {
  return (
    <StyledContainer>
      <HouseDetail houseState={houseState} />
      <HouseResultImage estimateYear={houseState.estimateTimeArray[0]} />
      <Button
        content='다시 해보기'
        handleButtonClick={handleButtonClick}
        rest={false}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default HasHouseData;
