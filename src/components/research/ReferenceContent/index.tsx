import { memo } from 'react';
import styled from 'styled-components';
import { PrefetchedHouse } from '~/types/research';
import ReferenceHouse from './ReferenceHouse';

interface Props {
  title: string;
  apartment: PrefetchedHouse[];
  handleHouseClick: (data: PrefetchedHouse) => void;
}

const ReferenceContent = ({ title, apartment, handleHouseClick }: Props) => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledHouseWrapper>
          {apartment.map(({ danjiName, roadAddress }, index) => (
            <ReferenceHouse
              key={index}
              danjiName={danjiName}
              roadAddress={roadAddress}
              onClick={() => handleHouseClick({ danjiName, roadAddress })}
            />
          ))}
        </StyledHouseWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 150px;
  background: ${(props) => props.theme.color.main_content_background};
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 20px;
  margin: 20px 0;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  margin-top: 10px;
  font-weight: 700;
  font-size: 26px;
`;

const StyledHouseWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export default memo(ReferenceContent);
