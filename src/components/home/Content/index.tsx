import { ReactNode } from 'react';
import styled from 'styled-components';
import { LinkButton, NextImage } from '~/components/common';
import { ValueOf } from '~/types/helper';
import { PAGE_ROUTE } from '~/constants';

interface Props {
  title: string;
  pageTo: ValueOf<typeof PAGE_ROUTE>;
  imageSrc: string;
  children: ReactNode;
  imagePriority?: boolean;
}

const Content = ({
  title,
  pageTo,
  imageSrc,
  imagePriority,
  children,
}: Props) => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitleWrapper>
          <div>{title}</div>
        </StyledTitleWrapper>

        <StyledImageWrapper>
          <NextImage
            imageSrc={imageSrc}
            alt={'content image'}
            width={'280px'}
            height={'170px'}
            priority={imagePriority}
          />
        </StyledImageWrapper>

        <StyledStoryWrapper>
          <StyledStory>{children}</StyledStory>
        </StyledStoryWrapper>

        <LinkButton pageTo={pageTo}>테스트 시작</LinkButton>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  width: 100%;
  height: 450px;
  background: ${(props) => props.theme.color.main_content_background};
  color: #ffffff;
  padding: 15px 25px;
  &:first-child {
    border-radius: 20px 20px 0 0;
  }
  &:last-child {
    border-radius: 0 0 20px 20px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledTitleWrapper = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const StyledImageWrapper = styled.div`
  filter: drop-shadow(3px 4px 4px rgba(0, 0, 0, 0.25));
  color: transparent;
`;

const StyledStoryWrapper = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  margin-top: 20px;
  padding: 0 10px;
`;
const StyledStory = styled.div``;

export default Content;
