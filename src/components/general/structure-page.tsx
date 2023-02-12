import React from "react";
import styled, { css } from "styled-components";

type GeneralStructureInterface = {
  contentLeft: any;
  contentRight: any;
  isMobile: boolean;
};

export const GeneralStructure = ({
  contentLeft,
  contentRight,
  isMobile
}: GeneralStructureInterface) => {
  return (
    <Content isMobile={isMobile}>
      <ContentSide>{contentLeft}</ContentSide>
      <ContentSide>{contentRight}</ContentSide>
    </Content>
  );
};

type ContentProps = {
    children: any;
    isMobile: boolean;
}

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      width: 100%;
    `}
`;

const ContentSide = styled.div`
  max-width: 50%;
  margin: auto;
`;
