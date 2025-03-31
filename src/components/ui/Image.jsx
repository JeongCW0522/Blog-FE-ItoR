import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || '500px'};
  border-radius: ${(props) => props.radius || '0px'};
  object-fit: cover;
`;

const Image = ({ src, alt, width, height, radius }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} radius={radius} />;
};

export default Image;
