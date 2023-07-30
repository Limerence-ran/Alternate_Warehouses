

import style from './main.module.css'
import React, { useState } from "react";

const Popup = () => {
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
                     value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida justo vel orci lacinia sodales. Sed auctor metus a finibus volutpat. Etiam pellentesque tincidunt sem id maximus. Donec pulvinar tempor mauris, ut feugiat est mattis quis. Mauris fringilla fermentum fringilla. Proin euismod metus augue, nec sollicitudin nunc ullamcorper a. Praesent facilisis, nibh eget dapibus mollis, tortor sapien viverra quam, at convallis massa lacus sed lorem. Mauris quis commodo odio, sit amet sagittis enim. Pellentesque ut felis eu risus fringilla efficitur. Praesent at ornare nisi, et venenatis ex."
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

export default function Cancel() {
   return (
      <div className={style.App}>
         <Popup />
      </div>
   );
}