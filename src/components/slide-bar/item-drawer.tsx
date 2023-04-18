import React from 'react';
import styled from 'styled-components';
import { SvgIcon, SvgIconTypeMap } from '@mui/material';
import { TextSnippet } from '@mui/icons-material';

type Item = {
  text?: string;
  imgIcon?: any;
  activeIteam?: boolean;
  onClick?: () => void;
  index?: number;

}

const GeneralItemDrawer = ({ text = "", imgIcon, activeIteam = false, onClick, index=0}: Item) =>(
  <DrawerItem  onClick={onClick} type={activeIteam} text={text} index={index}>
    <SvgIconStyle component={imgIcon} fontSize={'large'} type={activeIteam} htmlColor='#FBF7EF' inheritViewBox />
    <ContentText text={!!text}>{text}</ContentText>
  </DrawerItem>
);


type DrawerItemProps = {
  children : any;
  type: boolean;
  index: number;
  text: string;
}


type ContentTextProps = {
  text: boolean;
}

const SvgIconStyle = styled(SvgIcon)<any>`
  color: ${({type }) => type ? '#FBF7EF' : '#3D3D3D'};
  margin: auto;
  font-size: 50px;

`;

const DrawerItem = styled.div<DrawerItemProps>`
  background: ${({ type }) => type ? '#3D3D3D' : '#FBF7EF'};
  color: ${( {type }) => type ? '#FBF7EF' : '#3D3D3D'};
  &: hover {
    background: #3D3D3D;
    -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
    color : #FBF7EF;
    cursor: pointer;
    ${SvgIconStyle}{
      color:#FBF7EF;
    }
  }
  -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:5rem;
  `;

const ContentText = styled.p<ContentTextProps>`
margin: auto;
-webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
  text-align: left;
  width: ${({ text }) => text ? '50%' : '0%'};
`;

export default GeneralItemDrawer;