import Head from 'next/head';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from '~/components/common';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>집사요~</title>
      </Head>
      <Container>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: ${(props) => props.theme.width.default_global_width};
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;

const ContentWrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100% - ${(props) => props.theme.height.header_height});
  background-color: ${(props) => props.theme.background.default};
`;

export default DefaultLayout;
