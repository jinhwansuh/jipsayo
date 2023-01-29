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
      <HeaderText onClick={handleHomeClick}>집사요</HeaderText>
    </Container>
  );
};

const Container = styled.header`
  z-index: 5000;
  min-height: ${(props) => props.theme.height.header_height};
  background-color: ${(props) => props.theme.color.default_header};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

export default Header;
