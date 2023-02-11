import { ArrowForward } from '@mui/icons-material';
import { Box, SvgIcon } from '@mui/material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import React from 'react';
import styled from 'styled-components';

type ruteStatusInterface = {
  ruteStatus: string;
  progressRute: number;
}

export const ProgressRute = ({ruteStatus, progressRute} : ruteStatusInterface) => {

  const value = 66;
  return(
    <Content>
      <CircularProgressStyled value={value} strokeWidth={13} >
        <SvgIconStyled component={ArrowForward} />
      </CircularProgressStyled>
    </Content>
  );

}

const Content = styled.div`
    width: 150;
  height: 150;
  border-radius: 50%;
  margin-top:auto;
  margin-bottom: auto;
  
`;

const CircularProgressStyled = styled(CircularProgressbarWithChildren)`
width:80px;
stroke: #F2E6CF;
position: center;
margin-top: 0%;
`;


const SvgIconStyled = styled(SvgIcon)`
margin-right: auto;
margin-left: auto;
margin-top: 25%;
margin-bottom: auto;
font-size: 45px;
`;