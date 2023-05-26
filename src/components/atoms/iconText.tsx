import { Receipt } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import styled from "styled-components";
import Colors from "../../utils/colors";
import { stringCutting } from "../../utils/stringModifier";

type IconTextProps = {
  text: string;
  textColor?: string;
  icon?: any;
  maxCharacters?: number | undefined;
  iconSize: "small" | "inherit" | "large" | "medium" | undefined;
};

export const IconText = ({ text, maxCharacters = 30, icon,iconSize='small',textColor =Colors().tizatl600 }: IconTextProps) => {
  return (
    <ContentText textColor={textColor}>
      <SvgIconStyled component={icon ? icon : Receipt} fontSize={iconSize} />
      {stringCutting(text, maxCharacters)}
    </ContentText>
  );
};

type ContentTextProps = {
  children: any;
  textColor: string;
};

type SvgIconStyledProps = {
  component: any;
};

const ContentText = styled.div<ContentTextProps>`
  font-family: Nunito;
  color: ${({textColor})=>textColor};
  font-weight: 500;
  font-size: 0.8rem;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const SvgIconStyled = styled(SvgIcon)<SvgIconStyledProps>`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  justify-content: center;
`;
