import styled from 'styled-components';
import { HouseData } from '~/types/house';
import { convertCostToFullWon } from '~/utils/functions/house';

interface Props {
  houseState: HouseData;
}

const HouseDetail = ({ houseState }: Props) => {
  const {
    roadAddress,
    cost,
    danjiName,
    estimateTime,
    dealDate,
    dedicatedArea,
  } = houseState;

  const dealDay = dealDate.split('T')[0];
  const FullWon = convertCostToFullWon(cost);
  return (
    <StyledContainer>
      <StyledTitleWrapper>
        <StyledDanji>
          <StyledDanjiText>{danjiName}</StyledDanjiText>
          <div>{roadAddress}</div>
        </StyledDanji>
        <StyledSub>
          <StyledDedicatedArea>{`${dedicatedArea}m2`}</StyledDedicatedArea>
          <div style={{ whiteSpace: 'nowrap' }}>{dealDay}(거래)</div>
        </StyledSub>
      </StyledTitleWrapper>

      <StyledDetailWrapper>
        <div>최근 실거래가 기준</div>
        <div>
          <StyledHighlightText>{FullWon}</StyledHighlightText>
        </div>
      </StyledDetailWrapper>

      <StyledDetailWrapper>
        <div>아파트 구매까지</div>
        <div>
          <StyledHighlightText>{estimateTime}</StyledHighlightText>걸립니다.
        </div>
      </StyledDetailWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 220px;
  font-size: 15px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

const StyledDanji = styled.div``;
const StyledDanjiText = styled.div`
  font-weight: 800;
  font-size: 28px;
`;

const StyledSub = styled.div`
  text-align: -webkit-right;
`;
const StyledDedicatedArea = styled.div`
  width: 86px;
  height: 30px;
  background: ${(props) => props.theme.color.main_content_background};
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const StyledDetailWrapper = styled.div`
  margin: 10px 0;
`;

const StyledHighlightText = styled.span`
  font-weight: 700;
  font-size: 28px;
  line-height: 30px;
  color: ${(props) => props.theme.color.result_highlight_text};
`;

export default HouseDetail;
