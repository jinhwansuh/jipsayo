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
            title='예상 기간 조회하기'
            pageTo={PAGE_ROUTE.RESEARCH_FIRST}
            imageSrc={'/image/result.png'}
            imagePriority={true}
          >
            내 자산과 한 달 저축 금액을 입력하여 원하는 집을 언제쯤 살 수 있을지
            테스트해 보세요!
          </Content>

          <Content
            title='지도에서 검색하기'
            pageTo={PAGE_ROUTE.MAP}
            imageSrc={'/image/map.png'}
          >
            원하는 가격과 이동거리를 설정하여 내 주변에 조건에 맞는 어떤 집이
            있을까 찾아보세요!
          </Content>
        </StyledContentWrapper>
      </Container>
    </>
  );
}

const StyledContentWrapper = styled.div`
  margin-top: 20px;
`;
