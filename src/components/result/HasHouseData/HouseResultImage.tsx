import styled from 'styled-components';

interface Props {
  estimateYear: number;
}

const HouseResultImage = ({ estimateYear }: Props) => {
  const imageIndex = Math.floor(estimateYear / 10);
  const futureAge = 30 + imageIndex * 10;
  const imageSrc = futureAge > 200 ? 200 : futureAge;

  return (
    <StyledImageContainer>
      <StyledTextWrapper>
        <StyledBoldText>구매할 미래의 내 모습</StyledBoldText>
      </StyledTextWrapper>
      <StyledImageWrapper>
        <StyledImage
          src={`${process.env.NEXT_PUBLIC_PICTURE_END_POINT}/age/${imageSrc}.jpg`}
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
