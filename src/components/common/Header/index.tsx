import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import { ValueOf } from '~/types/helper';
import { PAGE_ROUTE } from '~/constants';
import Remixicon from '../Remixicon';

interface Props {
  backButton: boolean;
  pageTo?: ValueOf<typeof PAGE_ROUTE>;
}

const Header = ({ backButton, pageTo }: Props) => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    if (pageTo) router.push(pageTo);
  }, [pageTo]);

  const handleHomeClick = useCallback(() => {
    router.push(PAGE_ROUTE.HOME);
  }, []);

  return (
    <Container>
      {backButton && (
        <StyledIcon onClick={handleBackClick}>
          <Remixicon iconName='ri-arrow-left-s-line' size='30px' />
        </StyledIcon>
      )}
      <HeaderText onClick={handleHomeClick}>집사요</HeaderText>
    </Container>
  );
};

const Container = styled.header`
  z-index: 5000;
  max-width: ${(props) => props.theme.width.default_global_width};
  min-height: ${(props) => props.theme.height.header_height};
  background-color: ${(props) => props.theme.color.default_header};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;

const StyledIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 25px;
  transform: translate(0, -40%);
  cursor: pointer;
`;

const HeaderText = styled.div`
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

export default Header;
