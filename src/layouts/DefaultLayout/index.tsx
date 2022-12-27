import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from '~/components/common';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f1eded;
`;

export default DefaultLayout;
