import React from "react";
import styled from "styled-components";
import { useDeviceUser } from "../../../hooks/useMobile";
import { CardInformacion } from "../general-card";
import { GeneralInput } from "../generalInput/general-input";
import './styles.css';

type CardListInterface = {
  data: Array<Object>;
  columns: number;
};

export const CardList = ({ data, columns }: CardListInterface) => {
  const [isMobile] = useDeviceUser();
  return (
    <div className='listContainer' style={{gridTemplateColumns: `repeat(${columns?columns:isMobile?1:1}, 1fr)`}}>
      {data.map((item) => {
        return <CardInformacion data={item} />;
      })}
    </div>
  );
};

