import Script from 'next/script';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from '~/components/common';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' />

      <Container>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
    </>
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
