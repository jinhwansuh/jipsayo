import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { Button } from '~/components/domains';
import { PAGE_ROUTE } from '~/constants';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push(PAGE_ROUTE.RESEARCH_FIRST);
  };

  return (
    <>
      <Head>
        <title>집사요~</title>
        <meta name='description' content='my sweet home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Transitions>
        <StyledContentsWrapper>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            pariatur dignissimos rem eum, mollitia facilis incidunt voluptates
            in cumque odit, possimus inventore debitis accusantium corporis,
            quaerat ea iste. Nihil, et.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            pariatur dignissimos rem eum, mollitia facilis incidunt voluptates
            in cumque odit, possimus inventore debitis accusantium corporis,
            quaerat ea iste. Nihil, et.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            pariatur dignissimos rem eum, mollitia facilis incidunt voluptates
            in cumque odit, possimus inventore debitis accusantium corporis,
            quaerat ea iste. Nihil, et.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            pariatur dignissimos rem eum, mollitia facilis incidunt voluptates
            in cumque odit, possimus inventore debitis accusantium corporis,
            quaerat ea iste. Nihil, et.
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            pariatur dignissimos rem eum, mollitia facilis incidunt voluptates
            in cumque odit, possimus inventore debitis accusantium corporis,
            quaerat ea iste. Nihil, et.
          </div>
        </StyledContentsWrapper>
        <Button content='시작하기' handleButtonClick={handleStartClick} />
      </Transitions>
    </>
  );
}

const StyledContentsWrapper = styled.div``;
