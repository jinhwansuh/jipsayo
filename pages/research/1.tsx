import { useRouter } from 'next/router';
import { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { ErrorNoInputValue } from '~/components/Error';
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

  const handleInputClick = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setInputState((prev) => ({ ...prev, [e.target.name]: '' }));
  }, []);

  return (
    <>
      <NextHead title='자산 입력' />

      <Transitions>
        <StyledContainer>
          <InputWrapper>
            <EstimateInput
              handleInputChange={handleInputChange}
              title={'보유 현금'}
              tag={'만원'}
              name={'cash'}
              placeholder={'5000'}
              value={inputState.cash}
              onFocus={handleInputClick}
            />
            <EstimateInput
              handleInputChange={handleInputChange}
              title={'한달 저축 가능 금액'}
              tag={'만원'}
              name={'saving'}
              placeholder={'250'}
              value={inputState.saving}
              onFocus={handleInputClick}
            />
            <EstimateInput
              handleInputChange={handleInputChange}
              title={'연봉 인상률 (%)'}
              tag={'%'}
              name={'rate'}
              placeholder={'4'}
              value={inputState.rate}
              onFocus={handleInputClick}
            />
          </InputWrapper>
          {isError && <ErrorNoInputValue />}

          <Button
            rest={true}
            content='다음으로'
            handleButtonClick={handleNextClick}
          />
        </StyledContainer>
      </Transitions>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${(props) => props.theme.padding.default_top_bottom}
    ${(props) => props.theme.padding.default_left_right};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ResearchFirstPage;
