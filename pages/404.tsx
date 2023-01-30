import { ErrorNotFoundPage } from '~/components/Error';
import { Header } from '~/components/common';
import { Container } from '~/layouts';

const NotFoundPage = () => {
  return (
    <>
      <Header backButton={false} />
      <Container>
        <ErrorNotFoundPage />
      </Container>
    </>
  );
};

export default NotFoundPage;
