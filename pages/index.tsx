import styled from 'styled-components';
import { Header, NextImage } from '~/components/common';
import { Content } from '~/components/home';
import { PAGE_ROUTE } from '~/constants';
import { Container } from '~/layouts';

export default function Home() {
  return (
    <>
      <Header backButton={false} />
      <Container>
        <StyledTitleWrapper>
          <StyledTitle>집사기 위한 최고의 서비스</StyledTitle>

          <NextImage
            imageSrc={'/image/jipsayo.png'}
            alt='logo'
            width={'120px'}
            height={'70px'}
            priority={true}
          />
        </StyledTitleWrapper>

        <StyledContentWrapper>
          <Content
            title='예상 기간을 조회하세요'
            pageTo={PAGE_ROUTE.RESEARCH_FIRST}
            imageSrc={'/image/result.png'}
            imagePriority={true}
          >
            내 자산과 한 달 저축 금액을 입력하여 원하는 집을 언제쯤 살 수 있을지
            테스트해 보세요!
          </Content>

          <Content
            title='거리를 계산하세요'
            pageTo={PAGE_ROUTE.MAP}
            imageSrc={'/image/map.png'}
          >
            내 직장 주변에 조건에 맞는 어떤 집이 있을까 찾아보세요!
          </Content>
        </StyledContentWrapper>
      </Container>
    </>
  );
}

const StyledTitleWrapper = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  width: 220px;
  font-weight: 700;
  font-size: 34px;
  line-height: 36px;
`;

const StyledContentWrapper = styled.div``;
