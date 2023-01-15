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
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.theme.width.default_global_width};
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.padding.default_top_bottom}
    ${(props) => props.theme.padding.default_left_right};
  background-color: ${(props) => props.theme.background.default};
`;

export default DefaultLayout;
