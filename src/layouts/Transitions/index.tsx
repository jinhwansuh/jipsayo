import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Transitions = ({ children }: Props) => {
  return (
    <MotionWrapper
      initial={{ x: 150, y: 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: -150, y: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </MotionWrapper>
  );
};

const MotionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Transitions;
