import { Button } from '@mui/material';
import React, { useState} from 'react';
import styled from 'styled-components';
import {IconPhoto} from './icon-photo/icon-photo'

export const UserBar = () => {
  const [userData, setUserData] = useState({username: 'Indiana Jones'});

  return (
    <UserBarContent>
      <IconPhoto photoSrc='src\utils\images\avatar-icon.png' />
       <TextContent>
        <div>{userData.username}</div>
      </TextContent>
      <Button>Premium</Button>
      <Spacing/>
      <Button>Cerrar Sesion </Button>
    </UserBarContent>
  );
};

const UserBarContent = styled.div`
  color: #F2E6CF;
  max-width: 100%;
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
  width: 70vw;
`;

const TextContent = styled.div`
  margin: auto;
  width: auto;
`;
