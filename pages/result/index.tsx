import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextHead } from '~/components/common';
import { Button } from '~/components/domains';
import { FetchHouseResponse } from '~/types/house';
import { mockHouseData } from '~/utils/house';

const ResearchResultPage = () => {
  const router = useRouter();
  const [houseState, setHouseState] = useState<FetchHouseResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(() => true);

    setHouseState(() => ({ ...mockHouseData }));
    setIsLoading(() => false);
  }, []);

  const handleButtonClick = () => {
    router.push('/');
  };

  if (!houseState || isLoading) return <div>asdf</div>;

  return (
    <>
      <NextHead title='결과' />

      <div>{houseState.danjiName}</div>
      <div>{houseState.cost}</div>

      <Button content='홈으로' handleButtonClick={handleButtonClick} />
    </>
  );
};

export default ResearchResultPage;
