import React from "react";
import styled from "styled-components";
import { typeRoundedButton } from "../../types/typesButtons";
import Colors from "../../utils/colors";

function ButtonRounded({
  text,
  action,
  type,
  color = Colors().tizatl600,
  textColor,
  width,
  tagColor = Colors().tizatl600,
  tagTextColor = Colors().tizatl600,
  tagValue
}: typeRoundedButton) {
  return (
    <div onClick={action}>
      {type.toLowerCase() == "margin" ? (
        <MarginButton
          widthB={width ? width : "170px"}
          colorB={color}
          textColor={textColor}
        >
          {text.toUpperCase()}
          <Tag colorB={tagColor} textColor={tagTextColor}>
            {tagValue}
          </Tag>
        </MarginButton>
      ) : (
        <CompleteButton
          widthB={width ? width : "200px"}
          colorB={color}
          textColor={textColor}
        >
          {text.toUpperCase()}
          <Tag colorB={tagColor} textColor={tagTextColor}>
            {tagValue}
          </Tag>
        </CompleteButton>
      )}
    </div>
  );
}
type Props = {
  colorB: string;
  textColor: string;
  widthB?: string;
  children: any;
};

const MarginButton = styled.div<Props>`
  font-family: Nunito;
  border: 3px solid ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  border-radius: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  width: ${(props) => props.widthB};
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const CompleteButton = styled.div<Props>`
  font-family: Nunito;
  background-color: ${(props) => props.colorB};
  border: 3px solid ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  border-radius: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  width: ${(props) => props.widthB};
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Tag = styled.div<Props>`
  padding: 7px 12px;
  background-color: ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  border-radius: 40px;
`;

export default ButtonRounded;
