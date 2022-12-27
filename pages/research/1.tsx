import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { NextHead } from '~/components/common';
import { Button, EstimateInput } from '~/components/domains';
import { initialResearch } from '~/utils/house';
import { researchFirstState, researchIndexState } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const ResearchFirstPage = () => {
  const router = useRouter();
  const setResearchIndex = useSetRecoilState(researchIndexState);
  const [researchState, setResearchState] = useRecoilState(researchFirstState);
  const [isError, setIsError] = useState(false);
  const [inputState, setInputState] = useState(initialResearch);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextClick = () => {
    if (inputState.cash && inputState.rate && inputState.saving) {
      setIsError(() => false);
      setResearchState(() => ({ ...inputState }));
      setResearchIndex((prev) => ({ ...prev, first: true }));
      router.push(PAGE_ROUTE.RESEARCH_SECOND);
    } else {
      setIsError(() => true);
    }
  };

  return (
    <>
      <NextHead title='자산 입력' />
      <Transitions>
        <InputWrapper>
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'보유 현금'}
            tag={'만원'}
            name={'cash'}
            placeholder={'4000'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'한달 저축 가능 금액'}
            tag={'만원'}
            name={'saving'}
            placeholder={'200'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'연봉 인상률 (%)'}
            tag={'%'}
            name={'rate'}
            placeholder={'5.5'}
          />
        </InputWrapper>
        <ErrorContainer>
          {isError && <ErrorMessage>모든 항목을 입력해주세요</ErrorMessage>}
        </ErrorContainer>

        <Button content='다음으로' handleButtonClick={handleNextClick} />
      </Transitions>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.div`
  height: 20px;
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default ResearchFirstPage;
