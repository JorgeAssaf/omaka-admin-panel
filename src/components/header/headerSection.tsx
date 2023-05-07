import { listClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import Colors from "../../utils/colors";
import { ArrowLeft } from "../../utils/icons/arrowLeft";
import ButtonRounded from "../atoms/button-rounded";
import { Buttons } from "../atoms/buttons";
import "./styles.css";
type Avatarprops = {
  title: string;
  actionBtnAdd?: (value: string) => void;
  actionBack?: () => void;
  pedidos?: boolean;
  typeOrder?: number;
  typeOrderSet?: (typeOrder: number) => void;
  lengths?: any;
};

function HeaderSection({
  title,
  actionBtnAdd,
  actionBack,
  pedidos,
  typeOrder,
  typeOrderSet,
  lengths
}: Avatarprops) {
  return (
    <div className="headerSectionContainer '">
      <div className="containerHeaderFirst">
        <div className="superior  onboarding-header-add">
        {actionBack && (
        <div onClick={() => actionBack()} className="btnBack">
          <ArrowLeft fill={Colors().tizatl600} />
        </div>
      )}
          <p className="title">{title}</p>
          {actionBtnAdd && (
            <Buttons
              type="addCircle"
              action={() => actionBtnAdd("newPedido")}
            />
          )}
        </div>

        {pedidos && typeOrderSet ? (
          <div className="inferior onboarding-header-filter">
            <ButtonRounded
              text={"sin ruta"}
              type={typeOrder == 1 ? "complete" : "margin"}
              tagValue={lengths.uno}
              action={() => typeOrderSet(1)}
              color={Colors().zacatazcalli300}
              textColor={Colors().tliltik}
              tagColor={Colors().akostik050}
              tagTextColor={Colors().tliltik}
            />
            <ButtonRounded
              text={"en ruta"}
              type={typeOrder == 2 ? "complete" : "margin"}
              tagValue={lengths.dos}
              action={() => typeOrderSet(2)}
              color={Colors().texotli200}
              textColor={Colors().tliltik}
              tagColor={Colors().akostik050}
              tagTextColor={Colors().tliltik}
            />
            <ButtonRounded
              text={"Entregados"}
              type={typeOrder == 3 ? "complete" : "margin"}
              tagValue={lengths.tres}
              action={() => typeOrderSet(3)}
              color={Colors().chalchihuitl200}
              textColor={Colors().tliltik}
              tagColor={Colors().akostik050}
              tagTextColor={Colors().tliltik}
            />
            <ButtonRounded
              text={"Reportados"}
              type={typeOrder == 4 ? "complete" : "margin"}
              tagValue={lengths.cuatro}
              action={() => typeOrderSet(4)}
              color={Colors().xochipaltic400}
              textColor={Colors().tliltik}
              tagColor={Colors().akostik050}
              tagTextColor={Colors().tliltik}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default HeaderSection;
