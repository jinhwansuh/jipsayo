import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { NextHead } from '~/components/common';
import { researchIndexState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const DynamicResearch2 = dynamic(
  () => import('~/components/dynamicPage/DynamicResearch2'),
  {
    ssr: false,
  },
);

const ResearchSecondPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [pageRecoilState, setPageRecoilState] =
    useRecoilState(researchIndexState);

  useEffect(() => {
    setIsLoading(true);

    if (pageRecoilState.first) {
      setHasData(true);
      setIsLoading(() => false);
      return;
    }

    const timer = setTimeout(() => {
      router.replace(PAGE_ROUTE.RESEARCH_FIRST, undefined, { shallow: true });
    }, 4000);

    setIsLoading(() => false);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!hasData && !isLoading) return <div>데이터가 없습니다</div>;

  return (
    <>
      <NextHead title='주소 입력' />

      {hasData && <DynamicResearch2 />}
    </>
  );
};

export default ResearchSecondPage;
