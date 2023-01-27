import Image from 'next/image';
import styled from 'styled-components';

const MOCK =
  'https://images.unsplash.com/photo-1641913337604-7b040a87fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80';

// TODO: 추후 Image로 바꾸기
// TODO: prop 연동

interface Props {
  estimateYear: number;
}

const HouseResultImage = ({ estimateYear }: Props) => {
  const imageIndex = Math.floor(estimateYear / 10);
  const futureAge = 30 + imageIndex * 10;

  return (
    <StyledImageContainer>
      <StyledTextWrapper>
        <StyledBoldText>구매할 미래의 내 모습</StyledBoldText>
      </StyledTextWrapper>
      <StyledImageWrapper>
        <StyledImage
          src={MOCK}
          alt='result image'
          width={'100%'}
          height={'100%'}
        />
      </StyledImageWrapper>
      <StyledTextWrapper>
        <StyledBoldText>아마도... {futureAge}대</StyledBoldText>
      </StyledTextWrapper>
    </StyledImageContainer>
  );
};

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTextWrapper = styled.div`
  margin: 15px;
`;

const StyledBoldText = styled.p`
  font-weight: 800;
  font-size: 26px;
  line-height: 24px;
`;

const StyledImageWrapper = styled.div`
  width: 250px;
  height: 250px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;

export default HouseResultImage;
