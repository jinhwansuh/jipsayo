import { Header, NextHead } from '~/components/common';
import { KakaoMapContainer } from '~/components/kakao';
import { PAGE_ROUTE } from '~/constants';
import { Container } from '~/layouts';

const MapPage = () => {
  return (
    <>
      <NextHead title='지도 검색' />

      <Header backButton={true} pageTo={PAGE_ROUTE.HOME} />
      <Container>
        <KakaoMapContainer />
      </Container>
    </>
  );
};

export default MapPage;
