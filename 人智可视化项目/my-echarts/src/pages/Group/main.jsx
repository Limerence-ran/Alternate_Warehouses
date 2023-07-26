import React, { useState, useRef } from 'react';
// import { TeamOutlined, CaretDownOutlined } from '@ant-design/icons'
import style from './main.module.css';
import Company from '../../component/Company/main'
import Slider from '../../component/Slider/main'

function Group() {
    return (
        <>
           <Slider/>
            <div className={style.content}>
                <div className={style.header}>
                    <ul className={style.title}>
                        <li>Group Name</li>
                        <li>Group Name</li>
                        <li>Group Name</li>
                        <li>Group Name</li>
                        <li>Group Name</li>
                        <li></li>
                    </ul>
                </div>
                <main>
                    <div className={style.body}>
                        <Company />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Group;