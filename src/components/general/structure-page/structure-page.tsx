import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import styled, {css} from 'styled-components';


type GeneralStructureInterface = {
    contentLeft: any;
    contentRight: any;
    isMobile: boolean;
}

export const GeneralStructure = ({contentLeft, contentRight, isMobile}: GeneralStructureInterface) =>{
<Content isMobile={isMobile} >
<ContentSide>
    {contentLeft}
</ContentSide>
<ContentSide>
    {contentRight}
</ContentSide>
</Content>
}

const ContentLeft = styled.div`
display: flex;
${({isMobile}) => isMobile && css `
    border: 2px solid #3D3D3D;
    flex-direction: row;
  `}

  flex-direction: column;
`;

const ContentSide = styled.div`
    width: 50;
`;