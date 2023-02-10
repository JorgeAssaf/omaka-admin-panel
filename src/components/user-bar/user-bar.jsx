import { Button } from '@mui/material';
import React, { useState} from 'react';
import styled from 'styled-components';
import {IconPhoto} from './icon-photo/icon-photo'
import { Buttons } from '../general/buttons';

export const UserBar = () => {
  const [userData, setUserData] = useState({username: 'Indiana Jones'});

  return (
    <UserBarContent>
      <IconPhoto photoSrc='src\utils\images\avatar-icon.png' />
       <TextContent>
        <div>{userData.username}</div>
      </TextContent>
      <Buttons text='PREMIUM' type='primary' color='#F2E6CF' textColor='#292929' width='100px' />
      <Spacing/>
      <Buttons text='CERRAR SESION' type='secondary'  width='200px'/>
    </UserBarContent>
  );
};

const UserBarContent = styled.div`
  color: #F2E6CF;
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-around;
  float: right;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #292929;
`;
const Spacing = styled.div`
  width: 60vw;
`;

const TextContent = styled.div`
  margin: auto;
  margin-right: 30px;
  width: auto;
`;
