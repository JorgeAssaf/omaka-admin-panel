import React, { useState } from "react";
import './styles.css';
type Avatarprops = {
    src: string;
    fullName?: string;
    size?: string;
}

export default function Avatar ({src, fullName, size='middle'}: Avatarprops){
  return(
    <div className={`avatarContainer  ${size}`}>
        <img
            className='avatar'
            src={src}
            alt={fullName}
          />
    </div>
  );
};
