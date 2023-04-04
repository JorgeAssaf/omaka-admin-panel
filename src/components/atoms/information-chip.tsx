import React from "react";
import styled from "styled-components";
import Colors from "../../utils/colors";

type InformationChipInterface = {
  text?: string | undefined;
  color?: string;
  textColor?: string;
};



export const InformationChip = ({text, color = Colors().tizatl600, textColor = Colors().iztac}: InformationChipInterface) => {
  return (
    <Content
      color={color}
      textColor={textColor}
    >
      {text}
    </Content>
  );
};

type ContentProps = {
  color: string;
  textColor: string;
};

const Content = styled.div<ContentProps>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ color }) => color};
  border-radius: 25px;
  font-size: 10px;
  padding: 2px 10px;
  font-size: 0.8em;
  width: fit-content;
`;
