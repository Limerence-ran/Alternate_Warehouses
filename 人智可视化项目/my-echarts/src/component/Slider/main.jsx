import React, { useState, useRef } from 'react';
import { TeamOutlined, CaretDownOutlined } from '@ant-design/icons'
import style from './main.module.css';

function Group() {

    const dropDown = useRef(null);
    const [menu, setMenu] = useState(false);

    const IsShow = () => {
        console.log(dropDown.current)
        setMenu(!menu);
    };


    return (
        <>

    
            <div className={style.sidebar}>
                <ul className={style.menu}>
                    <li><a href="lunbo.html"> <TeamOutlined />Create Group</a></li>
                    <li className={style.divider} >Menu</li>

                    <li>
                        <a href="#" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a>
                        {!menu && <ul className={style.dropdown} ref={dropDown}>
                            <li><a href="profile.html" className={style.active}>huawei</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                        </ul>}
                    </li>
                    <li>
                        <a href="#" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a>
                        {!menu && <ul className={style.dropdown} ref={dropDown}>
                            <li><a href="profile.html" className={style.active}>huawei</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                            <li><a href="fix.html">tengxun</a></li>
                        </ul>}
                    </li>
                </ul>
            </div>

        </>
    );
}

export default Group;