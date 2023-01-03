import { ArrowForward } from '@mui/icons-material';
import { Box, CircularProgress, SvgIcon } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

type ruteStatusInterface = {
  ruteStatus: string;
  progressRute: number;
}

export const ProgressRute = ({ruteStatus, progressRute} : ruteStatusInterface) => {

  return(
    <Content>
      <CircularProgress variant='determinate' value={25} />
      <Circle>
        <SvgIconStyled component={ArrowForward} />
      </Circle>
    </Content>
  );

}

const Content = styled.div`
    width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Circle = styled(Box)`
 top: 0;
left: 0;
 bottom: 0;
          right: 0;
display: flex;
position: absolute;
align-items: center;
justify-content: center;
`;


const SvgIconStyled = styled(SvgIcon)`
  margin:auto;
`;