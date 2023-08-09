

import style from './main.module.css'
import React, { useState } from "react";

const Popup = (props) => {
   console.log("props:",props.value.value)
   const [showPopup, setShowPopup] = useState(true);

   const closePopup = () => {
      console.log(111)
      setShowPopup(false);
      setTimeout(() => {
         // setShowPopup(true);
      }, 300);
   };

   return (
      <>
         {showPopup && (
            <div className={style.popupbox}>
               <div className={style.textheader}><span>Group Description</span></div>
               <div className={style.canceltext}>
                  <textarea
                     readOnly
                     value={props.value.value} 
                     rows={14} cols={48} className={style.textarea} style={{ resize: "none" }}/>
               </div>
               <button className={style.cancelbutton} onClick={closePopup}>Cancel</button>
            </div>
         )}
      </>
   );
};

export default function Cancel(props) {
   return (
     <>
         <div className={style.App}>
            <Popup value={props} />
         </div>
     </>
   );
}