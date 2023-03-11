import React, { useState } from "react";
import Colors from "../../utils/colors";
import { ArrowLeft } from "../../utils/icons/arrowLeft";
import ButtonRounded from "../atoms/button-rounded";
import { Buttons } from "../atoms/buttons";
import './styles.css';
type Avatarprops = {
  title: string;
  actionBtnAdd?: (value: string) => void;
  actionBack? : () => void;
}

function HeaderSection ({title, actionBtnAdd, actionBack}: Avatarprops){
  return(
    <div className='headerSectionContainer'>
       {actionBack &&
          <div onClick={()=>actionBack()} className='btnBack'>
            <ArrowLeft fill={Colors().tizatl600} />
          </div>
       }
       <p className='title'>{title}</p>
       {actionBtnAdd &&
          <div>
          <Buttons type='addCircle' action={()=>actionBtnAdd('newPedido')} />
          <div className='filtrosContainer'>
            <ButtonRounded  text={'sin ruta'} type={'complete'} tagValue={2} action={()=>console.log('hola')} color={Colors().zacatazcalli300}  textColor={Colors().tliltik} tagColor={Colors().akostik050} tagTextColor={Colors().tliltik}/>
            <ButtonRounded  text={'en ruta'} type={'margin'} tagValue={2} action={()=>console.log('hola')} color={Colors().texotli200}  textColor={Colors().tliltik} tagColor={Colors().akostik050} tagTextColor={Colors().tliltik}/>
            <ButtonRounded  text={'Entregados'} type={'margin'} tagValue={2} action={()=>console.log('hola')} color={Colors().chalchihuitl200}  textColor={Colors().tliltik} tagColor={Colors().akostik050} tagTextColor={Colors().tliltik}/>
            <ButtonRounded  text={'Omitidos'} type={'margin'} tagValue={2} action={()=>console.log('hola')} color={Colors().xochipaltic400}  textColor={Colors().tliltik} tagColor={Colors().akostik050} tagTextColor={Colors().tliltik}/>

          </div>
          </div>
       }
    </div>
  );
};

export default HeaderSection;