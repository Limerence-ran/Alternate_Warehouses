import React, { useState, useRef, useEffect } from 'react';
import style from './main.module.css';

import Page from '../PageList/main'

function Group() {

    return (
        <>
            <div className={style.content}>
                <Page className={style.paging} />
            </div>
        </>
    );
}

export default Group;
