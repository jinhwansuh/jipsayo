import { useRouter } from 'next/router';
import { Button } from '~/components';

const ResearchResultPage = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <>
      <div>결과 페이지 입니다.</div>
      <Button content='홈으로' handleButtonClick={handleButtonClick} />
    </>
  );
};

export default ResearchResultPage;
