import React from 'react';
import styled from 'styled-components';
import { SvgIcon } from '@mui/material';
import { TextSnippet } from '@mui/icons-material';

type Item = {
  text: string;
  imgIcon: any;
  activeIteam: boolean;
  onClick: any;
  index: number;

}

const GeneralItemDrawer = ({ text, imgIcon, activeIteam, onClick, index }: Item) =>(
  <DrawerItem onClick={onClick} type={activeIteam} text={text} index={index}>
    <SvgIconStyle component={imgIcon} fontSize={'large'} type={activeIteam} htmlColor='#FBF7EF' inheritViewBox />
    <ContentText text={!!text}>{text}</ContentText>
  </DrawerItem>
);

const SvgIconStyle = styled(SvgIcon)`
  color: ${({type }) => type ? '#FBF7EF' : '#3D3D3D'};
  margin: auto;
  font-size: 50px;

`;

const DrawerItem = styled.div`
  background: ${({ type }) => type ? '#3D3D3D' : '#FBF7EF'};
  color: ${( {type }) => type ? '#FBF7EF' : '#3D3D3D'};
  border-top-right-radius: ${({ type, index }) => index != 0 ? '0' : '24px'};
  &: hover {
    background: #3D3D3D;
    color:#FBF7EF;
    cursor: pointer;
    border-top-right-radius: ${({ index }) => index != 0 ? '0' : '24px'};
    ${SvgIconStyle}{
      color:#FBF7EF;
    }
  }
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:5rem;
  `;

const ContentText = styled.div`
margin: auto;
  text-align: left;
  width: ${({ text }) => text ? '50%' : '0%'};
`;

export default GeneralItemDrawer;