

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
               <div className={style.textheader}><span>Group DEscription</span></div>
               <div className={style.canceltext}>
                  <textarea
                     readOnly
                     value={props.value.value} 
                     rows={20} cols={48} className={style.textarea} />
               </div>
               {/* <div className={style.cancelbutton} onClick={closePopup}>
                   Cancel
               </div> */}
               <button className={style.cancelbutton} onClick={closePopup}>Cancel</button>
            </div>
         )}
      </>
   );
};

export default function Cancel(props) {
   return (
      <div className={style.App}>
         <Popup value={props}/>
      </div>
   );
}