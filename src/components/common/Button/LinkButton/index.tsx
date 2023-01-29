import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { ValueOf } from '~/types/helper';
import { PAGE_ROUTE } from '~/constants';
import { StyledButton } from '../Button.styled';

interface Props {
  pageTo: ValueOf<typeof PAGE_ROUTE>;
  children: ReactNode;
}

const LinkButton = ({ pageTo, children, ...props }: Props) => {
  return (
    <StyledButtonWrapper {...props}>
      <Link href={pageTo}>
        <StyledButton type='button'>{children}</StyledButton>
      </Link>
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

export default LinkButton;
