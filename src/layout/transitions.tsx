import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const Transitions = ({ children }: Props) => {
  return (
    <motion.main
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
    </motion.main>
  );
};

export default Transitions;
