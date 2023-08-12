import React, { useState, useRef, useEffect } from 'react';
import style from './main.module.css';


import HotTable from './hotTable/main'

function HotGroup() {

    return (
        <>
            <div className={style.content}>
                <HotTable />
            </div>
        </>
    );
}

export default HotGroup;
