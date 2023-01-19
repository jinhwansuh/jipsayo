import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Remixicon } from '~/components/common';

interface Props {
  HouseSize: string;
  HouseMarketPriceDate: string;
}

const HouseTooltip = ({ HouseSize, HouseMarketPriceDate }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    if (isTooltipOpen) {
      const timer = setTimeout(() => {
        setIsTooltipOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isTooltipOpen]);

  const handleTooltipClick = useCallback(() => {
    setIsTooltipOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Container>
        <StyledOpenButton
          onClick={handleTooltipClick}
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
        >
          <Remixicon iconName='ri-question-line' size='18px' />
        </StyledOpenButton>
        {isTooltipOpen && (
          <StyledTooltipContainer>
            <StyledContent>
              {HouseSize} {HouseMarketPriceDate}
            </StyledContent>
            <StyledPointer />
          </StyledTooltipContainer>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: inline-block;
`;

const StyledOpenButton = styled.div`
  cursor: pointer;
`;

const StyledTooltipContainer = styled.div`
  position: absolute;
  transform: translate(-90px, -85px);
  width: 150px;
  height: 40px;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPointer = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-top: 12px solid #fff;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  left: 20px;
`;

export default memo(HouseTooltip);
