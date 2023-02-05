import { useRouter } from 'next/router';
import { Pagination, AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import styled from 'styled-components';
import { HOME_IMAGES } from '~/constants';

const plugins = [
  new Pagination({ type: 'bullet' }),
  new AutoPlay({ duration: 3000, direction: 'NEXT', stopOnHover: false }),
];

const ImageCarousel = () => {
  const router = useRouter();

  return (
    <StyledImageContainer>
      <Flicking circular={true} plugins={plugins}>
        {HOME_IMAGES.map((image, index) => (
          <StyledImage
            key={index}
            src={image.imageSrc}
            alt='main image'
            onClick={() => router.push(image.pathTo)}
          />
        ))}
        <ViewportSlot>
          <div className='flicking-pagination' />
        </ViewportSlot>
      </Flicking>
    </StyledImageContainer>
  );
};

const StyledImageContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  height: 200px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  cursor: pointer;
`;

export default ImageCarousel;
