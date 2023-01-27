import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  title: string;
  pageTo: string;
  imageSrc: string;
  story1: string;
  stroy2: string;
}

const Content = ({ title, pageTo, imageSrc, story1, stroy2 }: Props) => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitleWrapper>
          <div>집값을 계산하세요</div>
        </StyledTitleWrapper>

        <StyledImageWrapper>
          <Image src='/image/result.png' alt='content image' fill={true} />
        </StyledImageWrapper>

        <StyledStoryWrapper>
          <StyledStory>
            하늘 높은줄 모르고 오르는 집값.과연 내가 집을 살 수는 있을까??
          </StyledStory>
          <StyledStory>
            내 연봉으로 원하는 집을 언제쯤 살 수 있을지 테스트 해보세요!
          </StyledStory>
        </StyledStoryWrapper>

        <StyledButtonWrapper>
          <StyledButton type='button'>
            <Link href={'/research/1'}>테스트 시작</Link>
          </StyledButton>
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
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 170px;
`;
const StyledStoryWrapper = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
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
