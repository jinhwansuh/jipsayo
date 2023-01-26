import Link from 'next/link';
import styled from 'styled-components';
import { PAGE_ROUTE } from '~/constants';
import { Button } from '../common';

const ErrorNotFoundPage = () => {
  return (
    <Container>
      <ErrorText>404 This page could not be found.</ErrorText>
      <Link href={PAGE_ROUTE.HOME}>
        <StyledButton content={'Back to Home'} rest={false} />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorText = styled.div`
  font-size: 20px;
  weight: 800;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default ErrorNotFoundPage;
