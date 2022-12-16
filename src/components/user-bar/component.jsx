import { Button } from '@mui/material';
import React, { useState} from 'react';
import styled from 'styled-components';
import {IconPhoto} from './icon-photo/icon-photo'

const UserBar = () => {
  const [userData, setUserData] = useState({username: 'Indiana Jones'});

  return (
    <UserBarContent>
      <IconPhoto photo='src\utils\images\avatar-icon.png' />
       <TextContent>
        <div>{userData.username}</div>
      </TextContent>
      <Button>Premium</Button>
      <div>Cerrar sesión</div>
    </UserBarContent>
  );
};

export default UserBar;

const UserBarContent = styled.div`
  color: #F2E6CF;
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: left;
  float: right;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #292929;
`;
const Spacing = styled.div`
  width: 85%;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;
