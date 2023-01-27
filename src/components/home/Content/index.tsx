import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { NextImage } from '~/components/common';

interface Props {
  title: string;
  pageTo: string;
  imageSrc: string;
  children: ReactNode;
}

const Content = ({ title, pageTo, imageSrc, children }: Props) => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitleWrapper>
          <div>{title}</div>
        </StyledTitleWrapper>

        <NextImage
          imageSrc={imageSrc}
          alt={'content image'}
          width={'280px'}
          height={'170px'}
        />

        <StyledStoryWrapper>
          <StyledStory>{children}</StyledStory>
        </StyledStoryWrapper>

        <StyledButtonWrapper>
          <Link href={pageTo}>
            <StyledButton type='button'>테스트 시작</StyledButton>
          </Link>
        </StyledButtonWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  width: 100%;
  height: 450px;
  background: ${(props) => props.theme.color.main_content_background};
  color: #ffffff;
  border-radius: 30px;
  padding: 15px 25px;
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

const StyledStoryWrapper = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  margin-top: 20px;
`;
const StyledStory = styled.div``;

const StyledButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 296px;
  height: 48px;
  border-radius: 30px;
  background: ${(props) => props.theme.color.button_select};
  padding: 13px 23px;
  font-size: 16px;
  font-weight: 600;
`;

export default Content;
