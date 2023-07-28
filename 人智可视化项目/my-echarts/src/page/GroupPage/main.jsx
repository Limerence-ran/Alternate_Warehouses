import React, { useState, useRef, useEffect } from 'react';
import style from './main.module.css';
import Slider from '../../component/Slider/main'
import Page from '../../component/Paging/main'

function Group() {

    return (
        <>
         <div className={style.group}>
                <Slider />
                <div className={style.content}>
                    < >
                        <Page className={style.paging} />

                    </>
                </div>
         </div>
        </>
    );
}

export default Group;
