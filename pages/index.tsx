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
        <Container>
          <ImageCarousel />

          <Button
            rest={true}
            content='시작하기'
            handleButtonClick={handleStartClick}
          />
        </Container>
      </Transitions>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
