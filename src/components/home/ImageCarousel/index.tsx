import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { houseImageData } from '~/utils/house';

const variants = {
  initial: {
    x: 200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -200,
    opacity: 0,
  },
};

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = index + 1;
      if (nextIndex >= houseImageData.length) nextIndex = 0;
      setIndex(() => nextIndex);
    }, 6000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <StyledImageWrapper>
      <motion.img
        key={index}
        variants={variants}
        animate='animate'
        initial='initial'
        exit='exit'
        src={houseImageData[index]}
        alt='image'
        width={'100%'}
        height={500}
      />
    </StyledImageWrapper>
  );
};

const StyledImageWrapper = styled.div`
  display: flex;
`;

export default ImageCarousel;
