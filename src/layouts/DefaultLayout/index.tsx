import Head from 'next/head';
import Script from 'next/script';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from '~/components/common';
import { KAKAO_URL } from '~/constants';

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
