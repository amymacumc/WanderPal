import React from 'react';

interface BasicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const BasicImage: React.FC<BasicImageProps> = ({ src, alt, ...props }) => {
  return <img src={src || '/images/fallback.png'} alt={alt} {...props} />;
};

export default BasicImage;