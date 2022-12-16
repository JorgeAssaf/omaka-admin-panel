import React from 'react';
import styled from 'styled-components';

interface Props{
  photo?: string;
}

export const IconPhoto:React.FC <Props> = ( {photo} ) => (
  <PhotoContanier>
    <img src= '../../../utils/images/avatar-icon.png' />
  </PhotoContanier>
);

const Photo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
`;

const PhotoContanier = styled.div`
  width: 44px;
  height: 44px;
  overflow: hidden;
  object-fit: cover;
  margin: auto;
  border-radius: 50%;
`;
