import Link from 'next/link';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { Button } from '~/components/common';
import { ImageCarousel } from '~/components/home';
import { PAGE_ROUTE } from '~/constants';

export default function Home() {
  return (
    <Transitions>
      <Container>
        <ImageCarousel />
        <Link href={PAGE_ROUTE.RESEARCH_FIRST}>
          <Button rest={true} content='시작하기' />
        </Link>
      </Container>
    </Transitions>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
