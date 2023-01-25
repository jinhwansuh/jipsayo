import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { Button, NextHead } from '~/components/common';
import { EstimateInput } from '~/components/research';
import { initialResearch } from '~/utils/house';
import { researchIndexStateAtom, researchStateAtom } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';

const ResearchFirstPage = () => {
  const router = useRouter();
  const setResearchIndex = useSetRecoilState(researchIndexStateAtom);
  const setResearchRecoilState = useSetRecoilState(researchStateAtom);
  const [isError, setIsError] = useState(false);
  const [inputState, setInputState] = useState(initialResearch);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextClick = () => {
    if (inputState.cash && inputState.rate && inputState.saving) {
      setIsError(() => false);
      setResearchRecoilState((prev) => ({ ...prev, ...inputState }));
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
        <Container>
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

          <Button
            rest={true}
            content='다음으로'
            handleButtonClick={handleNextClick}
          />
        </Container>
      </Transitions>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

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
