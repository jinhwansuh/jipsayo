import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  imageSrc: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

const NextImage = ({ imageSrc, alt, ...props }: Props) => {
  return (
    <StyledImageWrapper {...props}>
      <Image src={imageSrc} alt={alt} fill={true} />
    </StyledImageWrapper>
  );
};

const StyledImageWrapper = styled.div<Pick<Props, 'width' | 'height'>>`
  position: relative;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

export default NextImage;
