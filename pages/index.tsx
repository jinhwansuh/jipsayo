import styled from 'styled-components';
import { Header } from '~/components/common';
import { Content, ImageCarousel } from '~/components/home';
import { PAGE_ROUTE } from '~/constants';
import { Container } from '~/layouts';

export default function Home() {
  return (
    <>
      <Header backButton={false} />
      <Container>
        <ImageCarousel />

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

const StyledContentWrapper = styled.div`
  margin-top: 20px;
`;
