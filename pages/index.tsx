import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { Button, ImageCarousel } from '~/components/domains';
import { PAGE_ROUTE } from '~/constants';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push(PAGE_ROUTE.RESEARCH_FIRST);
  };

  return (
    <>
      <Transitions>
        <ImageCarousel />

        <Button content='시작하기' handleButtonClick={handleStartClick} />
      </Transitions>
    </>
  );
}

const StyledContentsWrapper = styled.div``;
