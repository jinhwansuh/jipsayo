import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Remixicon } from '~/components/common';

interface Props {
  content: ReactNode;
}

const HouseTooltip = ({ content }: Props) => {
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
        <StyledOpenButton onClick={handleTooltipClick}>
          <Remixicon iconName='ri-question-line' size='18px' />
        </StyledOpenButton>
        {isTooltipOpen && (
          <StyledTooltipContainer>
            <StyledContent>{content}</StyledContent>
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
  height: 40px;
`;

const StyledContent = styled.div`
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
