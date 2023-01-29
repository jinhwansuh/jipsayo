import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import { PAGE_ROUTE } from '~/constants';
import { Button } from '../common';

const ErrorNoResultData = () => {
  const router = useRouter();

  const handlePushPrevPage = useCallback(() => {
    router.push(PAGE_ROUTE.RESEARCH_SECOND);
  }, []);

  return (
    <Container>
      <div>잘못된 접근입니다. </div>
      <Button
        content='먼저 데이터를 입력해주세요!'
        handleButtonClick={handlePushPrevPage}
        rest={false}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export default ErrorNoResultData;
