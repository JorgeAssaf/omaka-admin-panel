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
      <CircularProgressStyled value={value} >
        <SvgIconStyled component={ArrowForward} />
      </CircularProgressStyled>
    </Content>
  );

}

const Content = styled.div`
    width: 150;
  height: 150;
  border-radius: 50%;
`;

const CircularProgressStyled = styled(CircularProgressbarWithChildren)`
width:112px;
stroke: red;
position: center;
`;


const SvgIconStyled = styled(SvgIcon)`
margin-right: auto;
margin-left: auto;
margin-top: auto;
margin-bottom: auto;
`;