import { useRouter } from 'next/router';
import styled from 'styled-components';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Container>
      <ErrorText>404 This page could not be found.</ErrorText>
      <Button onClick={() => router.replace('/')}>Back to Home</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ErrorText = styled.div`
  font-size: 20px;
  weight: 800;
`;

const Button = styled.button`
  margin-top: 20px;
  cursor: pointer;
`;

export default NotFoundPage;
