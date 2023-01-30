import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Container = ({ className, children }: PropsWithChildren<Props>) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  max-width: ${(props) => props.theme.width.default_global_width};
  width: 100%;
  margin: 0 auto;
  min-height: calc(100% - ${(props) => props.theme.height.header_height});
  background-color: ${(props) => props.theme.background.default};
  position: relative;
`;

export default Container;
