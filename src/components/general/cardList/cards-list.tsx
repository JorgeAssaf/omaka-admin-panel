import React from "react";
import styled from "styled-components";
import { useDeviceUser } from "../../../hooks/useMobile";
import { CardInformacion } from "../generalCards/general-card";
import './styles.css';

type CardListInterface = {
  data: Array<Object>;
};

export const CardList = ({ data }: CardListInterface) => {
  const [isMobile] = useDeviceUser();
  return (
    <div className='listContainer'>
      {data.map((item) => {
        return <CardInformacion data={item} />;
      })}
    </div>
  );
};

