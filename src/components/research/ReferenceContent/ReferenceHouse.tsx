import { memo } from 'react';
import styled from 'styled-components';
import { PrefetchedHouse } from '~/types/research';

interface Props {
  danjiName: PrefetchedHouse['danjiName'];
  roadAddress: PrefetchedHouse['roadAddress'];
  onClick: () => void;
}

const ReferenceHouse = ({ danjiName, roadAddress, onClick }: Props) => {
  return (
    <StyledHouse onClick={onClick}>
      <StyledName>{danjiName}</StyledName>
      <StyledDetail>{roadAddress}</StyledDetail>
    </StyledHouse>
  );
};

const StyledHouse = styled.div`
  width: 100%;
  height: 90px;
  background: #ffffff;
  box-shadow: 1px 7px 10px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  padding: 20px 15px;
  margin: 15px 0;
  cursor: pointer;
`;

const StyledName = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 24px;
  color: #609ff2;
`;

const StyledDetail = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export default memo(ReferenceHouse);
