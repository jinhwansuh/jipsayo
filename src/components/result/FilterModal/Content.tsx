import { memo } from 'react';
import styled from 'styled-components';

const FilterModalContent = () => {
  return (
    <StyledContentContainer>
      <StyledContentWrapper>
        <StyledTitleText>가격</StyledTitleText>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad
          porro fugit nobis vitae. Molestiae est, qui numquam iste repellendus
          autem. Sit modi neque pariatur rerum debitis dolores dolorem
          repellat.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum ad porro fugit nobis vitae. Molestiae est, qui numquam iste
          repellendus autem. Sit modi neque pariatur rerum debitis dolores
          dolorem repellat.Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </div>
      </StyledContentWrapper>
      <StyledContentWrapper>
        <StyledTitleText>이동 수단</StyledTitleText>
        <StyledMoveSelect>
          <div>도보</div>
          <div>대중교통</div>
          <div>자가용</div>
        </StyledMoveSelect>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad
          porro fugit nobis vitae. Molestiae est, qui numquam iste repellendus
          autem. Sit modi neque pariatur rerum debitis dolores dolorem
          repellat.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum ad porro fugit nobis vitae. Molestiae est, qui numquam iste
          repellendus autem. Sit modi neque pariatur rerum debitis dolores
          dolorem repellat.Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </div>
      </StyledContentWrapper>

      <StyledContentWrapper>
        <StyledTitleText>시간</StyledTitleText>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad
          porro fugit nobis vitae. Molestiae est, qui numquam iste repellendus
          autem. Sit modi neque pariatur rerum debitis dolores dolorem
          repellat.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum ad porro fugit nobis vitae. Molestiae est, qui numquam iste
          repellendus autem. Sit modi neque pariatur rerum debitis dolores
          dolorem repellat.Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </div>
      </StyledContentWrapper>
    </StyledContentContainer>
  );
};

const StyledContentContainer = styled.div`
  overflow-y: auto;
  height: calc(93% - 64px);
  margin-bottom: calc(64px + 18px);
  padding: 0 ${(props) => props.theme.padding.modal_default_left_right};
`;

const StyledContentWrapper = styled.section`
  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const StyledTitleText = styled.h2`
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StyledMoveSelect = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default memo(FilterModalContent);
