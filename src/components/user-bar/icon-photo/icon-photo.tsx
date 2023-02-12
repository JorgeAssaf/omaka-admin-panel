import React from 'react';
import styled from 'styled-components';

interface UserBarProps{
  photoSrc: string;

}

export function IconPhoto ( {photoSrc}: UserBarProps ){ 
  return(
    <PhotoContanier>
      <Photo src={photoSrc} />
    </PhotoContanier>
  
)};


type PhotoContainerProps ={
  children : any
}

const Photo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
`;

const PhotoContanier = styled.div<PhotoContainerProps>`
  width: 44px;
  height: 44px;
  overflow: hidden;
  object-fit: cover;
  margin: 15px;
  border-radius: 50%;
`;
