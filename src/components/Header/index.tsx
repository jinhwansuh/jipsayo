import styled from 'styled-components';

const Header = () => {
  return <Container>헤더</Container>;
};

const Container = styled.header`
  z-index: 9000;
  height: 50px;
  background-color: #b6b6ef;
`;

export default Header;
