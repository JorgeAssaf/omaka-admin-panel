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
  tagColor = Colors().tizatl600,
  tagTextColor = Colors().tizatl600,
  tagValue
}: typeRoundedButton) {
  return (
    <div onClick={action}>
      {type.toLowerCase() == "margin" ? (
        <MarginButton
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
  children: any;
};

const MarginButton = styled.div<Props>`
  font-family: Nunito;
  border: 3px solid ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  border-radius: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin:8px;
`;
const CompleteButton = styled.div<Props>`
  font-family: Nunito;
  background-color: ${(props) => props.colorB};
  border: 3px solid ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  border-radius: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin:8px;
`;
const Tag = styled.div<Props>`
  padding: 4px 8px;
  background-color: ${(props) => props.colorB};
  color: ${(props) => props.textColor};
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  border-radius: 40px;
  margin-left:8px;
`;

export default ButtonRounded;
