import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled, { CSSProperties } from 'styled-components';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

const Transitions = ({ children, ...props }: Props) => {
  return (
    <StyledHorizontalMotion
      initial={{ x: 150, y: 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      // exit={{ x: -150, y: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </StyledHorizontalMotion>
  );
};

const StyledHorizontalMotion = styled(motion.div)`
  height: 100%;
`;

export default Transitions;
