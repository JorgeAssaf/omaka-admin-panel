import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Phone, Mail } from "@mui/icons-material";
import "./styles.css";
import { stringCutting } from "../../utils/stringModifier";
import { cardPropsType } from "../../types/typesCards";
import Colors from "../../utils/colors";
import { IconText } from "../atoms/iconText";
import Typography from "../atoms/typography";
import { ClientType } from "../../types/typeOrders";
import { InformationChip } from "../atoms/information-chip";

type CardPropsTypes = {
  data: ClientType;
  onClick?: (item: ClientType) => void;
  cardProps?: cardPropsType;
  activeItem?: string;
};

const CardCliente = ({
  activeItem,
  data,
  onClick,
  cardProps
}: CardPropsTypes) => {
  const { nombreCliente, telefonoPedido, direccionPedido } = data;
  const [isSelect, setIsSelect] = useState(false);

  const statusColor = {
    free: Colors().chalchihuitl400,
    expirate: Colors().zacatazcalli300,
    inRate: Colors().texotli200,
    inactive: Colors().xochipaltic400
  };

  useEffect(() => {
    setIsSelect(activeItem === data.idCliente);
  }, [activeItem]);

  const onClickItem = () => {
    if (onClick) onClick(data);
  };

  return (
    <ContentCard
      onClick={() => onClickItem()}
      fullWidth={cardProps?.fullWidth}
      isSelect={isSelect}
    >
      <div>
        <div className="title_card_container">
          <div className="title_card">
            <Typography color={Colors().akostik200} variant="cardTitle">
              {nombreCliente}
            </Typography>
            {data.Reports?.length ? (
              <div className="chip-container">
                <InformationChip
                  text={`${data.Reports?.length}`}
                  color={Colors().xochipaltic400}
                />
              </div>
            ) : null}
          </div>
        </div>

        <IconText
          icon={Mail}
          iconSize="small"
          text={direccionPedido}
          textColor={Colors().akostik200}
        />
        <IconText
          icon={Phone}
          iconSize="small"
          text={telefonoPedido}
          textColor={Colors().akostik200}
        />
      </div>
    </ContentCard>
  );
};

type ContentCardProps = {
  children: any;
  isSelect: boolean;
  fullWidth?: boolean;
};

const ContentCard = styled.div<ContentCardProps>`
  display: flex;
  flex-direction: row;
  background-color: #232323;
  border-radius: 12px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ isSelect }) =>
    isSelect &&
    css`
      border: 2px solid #f4be52;
    `}
  padding: 16px;
  min-width: 200px;
  margin: 8px;
`;

export default CardCliente;
