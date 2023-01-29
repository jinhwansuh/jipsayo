import styled from 'styled-components';
import { Content, Title } from '~/components/home';
import { PAGE_ROUTE } from '~/constants';

export default function Home() {
  return (
    <>
      <Title />

      <StyledContentWrapper>
        <Content
          title='집값을 계산하세요'
          pageTo={PAGE_ROUTE.RESEARCH_FIRST}
          imageSrc={'/image/result.png'}
        >
          내 연봉으로 원하는 집을 언제쯤 살 수 있을지 테스트 해보세요!
        </Content>

        <Content
          title='거리를 계산하세요'
          pageTo={PAGE_ROUTE.MAP}
          imageSrc={'/image/map.png'}
        >
          내 직장 주변에 조건에 맞는 어떤 집이 있을까 찾아보세요!
        </Content>
      </StyledContentWrapper>
    </>
  );
}

const StyledContentWrapper = styled.div``;

// /image/result.png
