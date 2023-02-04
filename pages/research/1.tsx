import { useRouter } from 'next/router';
import { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Transitions from '~/layouts/Transitions';
import { ErrorNoInputValue } from '~/components/Error';
import { Button, Header, NextHead } from '~/components/common';
import { EstimateInput } from '~/components/research';
import { initialResearch } from '~/utils/house';
import { researchIndexStateAtom, researchStateAtom } from '~/atoms/research';
import { PAGE_ROUTE } from '~/constants';
import { Container } from '~/layouts';

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
    const cash = inputState.cash;
    const rate = inputState.rate;
    const saving = inputState.saving;
    if (Number(cash) > 0 && Number(rate) > 0 && Number(saving) > 0) {
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

      <Header backButton={true} pageTo={PAGE_ROUTE.HOME} />
      <Container>
        <Transitions>
          <StyledContainer>
            <InputWrapper>
              <EstimateInput
                handleInputChange={handleInputChange}
                title={'보유 현금'}
                tag={'만원'}
                name={'cash'}
                placeholder={'6000'}
                value={inputState.cash}
                onFocus={handleInputClick}
              />
              <EstimateInput
                handleInputChange={handleInputChange}
                title={'한달 저축 가능 금액'}
                tag={'만원'}
                name={'saving'}
                placeholder={'200'}
                value={inputState.saving}
                onFocus={handleInputClick}
              />
              <EstimateInput
                handleInputChange={handleInputChange}
                title={'연봉 인상률 (%)'}
                tag={'%'}
                name={'rate'}
                placeholder={'3.7'}
                value={inputState.rate}
                onFocus={handleInputClick}
              />
            </InputWrapper>
            {isError && <ErrorNoInputValue />}

            <StyledButton
              rest={true}
              content='다음으로'
              handleButtonClick={handleNextClick}
            />
          </StyledContainer>
        </Transitions>
      </Container>
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

const StyledButton = styled(Button)`
  margin-top: 230px;
`;

export default ResearchFirstPage;
