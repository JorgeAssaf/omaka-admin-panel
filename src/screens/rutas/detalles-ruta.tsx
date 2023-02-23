import React, { useState } from "react";
import { RateTypeForm, RateTypeFormSimple } from "../../types/typeRate";

type DetallesRutaProps = {
  rateData : RateTypeFormSimple | RateTypeForm;
}

export const DetallesRuta = ({rateData}:DetallesRutaProps) => {
  return(
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rateData.nombreRuta}
    </div>
  );
};
