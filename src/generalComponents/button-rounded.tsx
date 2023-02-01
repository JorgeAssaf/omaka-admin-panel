import React from 'react';
import styled from 'styled-components'
import { typeRoundedButton } from '../types/typesButtons';

function ButtonRounded({text, action,type,color,textColor,width,tagColor,tagTextColor,tagValue}:typeRoundedButton) {
  return (
    <div onClick={action}  >
        {type.toLowerCase()=='margin'?

            <MarginButton widthB={width?width:'200px'} colorB={color} textColor={textColor}>{text}<Tag colorB={tagColor} textColor={tagTextColor}>{tagValue}</Tag></MarginButton>
            :
            <CompleteButton widthB={width?width:'200px'} colorB={color} textColor={textColor}>{text}<Tag colorB={tagColor} textColor={tagTextColor}>{tagValue}</Tag></CompleteButton>
      
        }
    </div>
  )
}
type Props={
    colorB:string,
    textColor:string,
    widthB:string   
  }
  
  const MarginButton = styled.div<Props>`
    font-family: Nunito;
    border:3px solid ${(props)=>props.colorB};
    color:${(props)=>props.textColor};
    border-radius:40px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    width:${(props)=>props.widthB};
    padding:18px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    
  `;
  const CompleteButton = styled.div<Props>`
  font-family: Nunito;
  background-color:${(props)=>props.colorB};
  border:3px solid ${(props)=>props.colorB};
  color:${(props)=>props.textColor};
  border-radius:40px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  width:${(props)=>props.widthB};
  padding:18px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
`;
  const Tag=styled.div<Props>`
    padding: 8px 17px;
    background-color:${(props)=>props.colorB};
    color:${(props)=>props.textColor};
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    border-radius:40px;
  `;
  

export default ButtonRounded;
