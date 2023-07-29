import React, { useState, useRef, useEffect } from 'react';
import style from './main.module.css';

import Groupshow from './Groupshow/main'

function Group() {

    return (
        <>
            <div className={style.content}>
                <Groupshow className={style.paging} />
            </div>
        </>
    );
}

export default Group;
