import React from "react";
import styled from "styled-components";
import { CardInformacion } from "./general-card";

type CardListInterface = {
  data: Array<Object>;
};

export const CardList = ({ data }: CardListInterface) => {
  return (
    <Content>
      <Row>
        {
            data.map((item)=>{
                return(
                    <CardInformacion data={item} />
                )
            })
        }
      </Row>

    </Content>
  );
};

type Props = {
  children: any
};

const Content = styled.div<Props>`
  display: flex;
  flex-direction: row;
`;
const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
`;
