import React, { useState, useRef, useEffect } from 'react';
import { TeamOutlined, CaretDownOutlined } from '@ant-design/icons'
import style from './main.module.css';
import { useNavigate } from 'react-router-dom';
function Slider() {
    const navigate = useNavigate();
    // const dropDown = useRef(null);
    // const [menu, setMenu] = useState(true);
    // const IsShow = () => {
    //     setMenu(!menu);
    // };
    function CreateGroup() {
        navigate('CreateGroup');
    };
    function MyGroup() {
        navigate('Group');
    }
    function HotGroup(){
        navigate('HotGroup');
    }
    return (
        <>
            <div className={style.sidebar}>
                <ul className={style.menu}>
                    <li onClick={CreateGroup}><a href="javascript:;"> <TeamOutlined />Create Group</a></li>
                    <li className={style.divider} >Menu</li>
                    <li onClick={HotGroup}> <a href="javascript:;"  > Hot Groups </a></li>
                    <li onClick={MyGroup}>
                        {/* <a href="#" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a> */}
                       
                        <a href="javascript:;"  > My Groups </a>
                        {/* <a href="javascript:;" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a> */}
                        {/* {!menu && <ul className={style.dropdown} ref={dropDown}>
                            <li><a href="#" className={style.active}>huawei</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                            <li ><a href="#">tengxun</a></li>
                        </ul>} */}
                    </li>
                    <li > <a href="javascript:;"  > group A </a></li>
                    <li > <a href="javascript:;"  > group B </a></li>
                    <li > <a href="javascript:;"  > group C </a></li>
                    <li > <a href="javascript:;"  > group D </a></li>
                    <li > <a href="javascript:;"  > group E </a></li>
                </ul>
            </div>
        </>
    );
}
export default Slider;

