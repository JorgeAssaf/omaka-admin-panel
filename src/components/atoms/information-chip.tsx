import React from "react";
import styled from "styled-components";

type InformationChipInterface = {
  state?: string;
  distancia?: string;
  style?: any;
};

const backgroundColor = {
  "Sin ruta": "#F4BE52",
  "En ruta": "#7979F6",
  "En curso": "#7979F6",
  pending: "#292929",
  finish: "#40C980",
  Distancia: "#FBF7EF"
};

export const InformationChip = ({
  state = "",
  distancia,
  style
}: InformationChipInterface) => {
  const colorBackGround = distancia ? "Distancia" : state;
  return (
    <Content
      style={style ? style : {}}
      state={backgroundColor[colorBackGround ? colorBackGround : "Sin ruta"]}
    >
      {distancia ? distancia : state.toLocaleUpperCase()}
    </Content>
  );
};

type ContentProps = {
  state: string;
  style: any;
};

const Content = styled.div<ContentProps>`
  color: ${({ state }) => (state === "#FBF7EF" ? "#292929" : "#FBF7EF")};
  background-color: ${({ state }) => state};
  border-radius: 25px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;
