import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  imageSrc: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
}

const NextImage = ({ imageSrc, alt, priority, ...props }: Props) => {
  return (
    <StyledImageWrapper {...props}>
      <Image src={imageSrc} alt={alt} fill={true} priority={priority} />
    </StyledImageWrapper>
  );
};

const StyledImageWrapper = styled.div<Pick<Props, 'width' | 'height'>>`
  position: relative;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

export default NextImage;
