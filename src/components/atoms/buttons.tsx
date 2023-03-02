import React from "react";
import styled from "styled-components";
import { typeButton } from "../../types/typesButtons";
import Colors from "../../utils/colors";
export function Buttons({
  text,
  action,
  disabled,
  loading,
  type,
  color,
  textColor = Colors().tizatl600,
  width
}: typeButton) {
  return (
    <div>
      {type.toLocaleLowerCase() == "primary" ? (
        <PrimaryButton
          onClick={() => !loading && action()}
          colorB={color}
          textColor={textColor}
          style={{ width: width }}
        >
          {!loading ? text?.toLocaleUpperCase() : "Cargando..."}
        </PrimaryButton>
      ) : type.toLocaleLowerCase() == "secondary" ? (
        <SecondaryButton
          onClick={() => !loading && action()}
          style={{
            border: `3px solid ${color}`,
            color: textColor,
            width: width
          }}
        >
          {!loading ? text?.toLocaleUpperCase() : "Cargando..."}
        </SecondaryButton>
      ) : type.toLocaleLowerCase() == "tertiary" ? (
        <TertiaryButton
          onClick={() => !loading && action()}
          style={{ color: textColor, width: width }}
        >
          {!loading ? text?.toLocaleUpperCase() : "Cargando..."}
        </TertiaryButton>
      ) : type.toLocaleLowerCase() == "addcircle" ? (
        <AddButton
          onClick={() => !loading && action()}
          style={{ color: textColor, width: width }}
        >
          +
        </AddButton>
      ) : (
        <></>
      )}
    </div>
  );
}

type Props = {
  colorB?: string;
  textColor: string;
};

const PrimaryButton = styled.div<Props>`
  font-family: Nunito;
  background-color: ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  border: 3px solid ${(props) => props.colorB};
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 32px;
  border-radius: 10px;
  cursor: pointer;
  padding: 6px 12px;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`;
const SecondaryButton = styled.div`
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 32px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const TertiaryButton = styled.div`
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 10px;
  padding: 19px;
  cursor: pointer;
`;

const AddButton = styled.div`
  background-color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin: 0px 10px;
  box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.2);
  font-size: 1.8rem;
  cursor: pointer;
`;
