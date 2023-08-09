import React, { useState, useRef, useEffect } from 'react';
import { TeamOutlined, CaretDownOutlined, FireOutlined,UsergroupAddOutlined} from '@ant-design/icons'
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
                    <li onClick={CreateGroup}><a href="javascript:;"> <UsergroupAddOutlined />Create Group</a></li>
                    <li className={style.divider} >Menu</li>
                    <li onClick={HotGroup}> <a href="javascript:;"  > <FireOutlined />Hot Groups </a></li>
                    <li onClick={MyGroup}>
                        <a href="javascript:;"  > <TeamOutlined />My Groups </a>
                    </li>
                    
                </ul>
            </div>
        </>
    );
}
export default Slider;

