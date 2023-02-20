import React, { useState } from "react";
import Colors from "../../utils/colors";
import { ArrowLeft } from "../../utils/icons/arrowLeft";
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
          <Buttons type='addCircle' action={()=>actionBtnAdd('newPedido')} />
       }
    </div>
  );
};

export default HeaderSection;