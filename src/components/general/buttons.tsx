import React from 'react'
import styled from 'styled-components'
import { typeButton } from '../../types/typesButtons';
export function Buttons({text, action, disabled,type,color,textColor,width}:typeButton) {
  return (
    <div>
      {
          type.toLocaleLowerCase()=='primary'?
          <PrimaryButton colorB={color} textColor={textColor} style={{width:width}}>{text.toLocaleUpperCase()}</PrimaryButton>
          :
          type.toLocaleLowerCase()=='secondary'?
          <SecondaryButton style={{border:`3px solid ${color}`, color:textColor,width:width}}>{text.toLocaleUpperCase()}</SecondaryButton>
          :
          type.toLocaleLowerCase()=='tertiary'?
          <TertiaryButton style={{color:textColor,width:width}}>{text.toLocaleUpperCase()}</TertiaryButton>
          :<></>

      }
    </div>
  )
}


type Props={
  colorB?:string,
  textColor:string
}

const PrimaryButton = styled.div<Props>`
  font-family: Nunito;
  background-color:${(props)=>props.colorB};
  color: ${(props)=>props.textColor};
  border:3px solid ${(props)=>props.colorB};
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 32px;
  width:120px;
  border-radius:10px;
  cursor: pointer;
  padding:5px;
  text-align:center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`;
const SecondaryButton = styled.div`
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 32px;
  border-radius:10px;
  padding:15px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover{
      color:red
  }
`;
const TertiaryButton =styled.div`
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size:1rem;
  border-radius:10px;
  padding:19px;
  cursor:pointer;
`