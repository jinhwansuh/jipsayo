import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PAGE_ROUTE } from '~/constants';

const Header = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push(PAGE_ROUTE.HOME);
  };

  return (
    <Container>
      <HeaderText>{'<'}</HeaderText>
      <HeaderText onClick={handleHomeClick}>집사요</HeaderText>
      <HeaderText>블라블라</HeaderText>
    </Container>
  );
};

const Container = styled.header`
  z-index: 9000;
  min-height: 50px;
  background-color: #b6b6ef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 20px;
`;

export default Header;
