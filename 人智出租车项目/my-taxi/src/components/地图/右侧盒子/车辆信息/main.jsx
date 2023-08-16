import React, { useEffect, useState } from 'react';
import style from './main.module.css';

export default function CarInfor() {


    return (
       
            <div className={style.capInfor}>
              <div><span>车主：</span></div>
              <div><span>日期：</span></div>
              <div><span>平均收入：</span></div>
              
             
            </div>
      
    )
}