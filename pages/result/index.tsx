import { useRouter } from 'next/router';
import { Button, Header } from '~/components';

const ResearchResultPage = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <>
      <main>
        <Header />
        <div>결과 페이지 입니다.</div>
        <Button content='홈으로' handleButtonClick={handleButtonClick} />
      </main>
    </>
  );
};

export default ResearchResultPage;
