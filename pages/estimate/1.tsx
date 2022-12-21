import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { EstimateInput } from '~/components';
import Header from '~/components/Header';
import { researchIndexState } from '~/atoms/research';
import Transitions from '~/layout/transitions';

const EstimateFirstPage = () => {
  const router = useRouter();
  const setResearchIndex = useSetRecoilState(researchIndexState);

  const handleNextClick = () => {
    setResearchIndex((prev) => ({ ...prev, first: true }));
    router.push('/estimate/2');
  };
  const handleInputChange = () => {
    console.log(123);
  };
  return (
    <>
      <Header />
      <Transitions>
        <InputWrapper>
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'보유 현금'}
            tag={'만원'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'한달 저축 가능 금액'}
            tag={'만원'}
          />
          <EstimateInput
            handleInputChange={handleInputChange}
            title={'가가가'}
            tag={'만원'}
          />
        </InputWrapper>

        <button onClick={handleNextClick}>다음으로</button>
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

export default EstimateFirstPage;
