import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, EstimateInput } from '~/components';
import Header from '~/components/Header';
import { researchFirstState, researchIndexState } from '~/atoms/research';

const EstimateFirstPage = () => {
  const router = useRouter();
  const setResearchIndex = useSetRecoilState(researchIndexState);
  const [researchState, setResearchState] = useRecoilState(researchFirstState);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResearchState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextClick = () => {
    if (researchState.cash && researchState.rate && researchState.saving) {
      setIsError(() => false);
      setResearchIndex((prev) => ({ ...prev, first: true }));
      router.push('/estimate/2');
    } else {
      setIsError(() => true);
    }
  };

  return (
    <>
      <main>
        <Header />
        <InputWrapper>
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'보유 현금'}
            tag={'만원'}
            name={'cash'}
            type={'number'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'한달 저축 가능 금액'}
            tag={'만원'}
            name={'saving'}
            type={'number'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'인상률'}
            tag={'만원'}
            name={'rate'}
            type={'number'}
          />
        </InputWrapper>

        {isError && <ErrorMessage>모든 항목을 입력해주세요</ErrorMessage>}

        <Button content='다음으로' handleButtonClick={handleNextClick} />
      </main>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default EstimateFirstPage;
