import React, { useState, useRef, useEffect } from 'react';
import { TeamOutlined, CaretDownOutlined } from '@ant-design/icons'
import style from './main.module.css';

function Slider() {
    const dropDown = useRef(null);
    const [menu, setMenu] = useState(true);
    const IsShow = () => {
        setMenu(!menu);
    };
   
    // useEffect(() => {
    //     if (menu) {
           
    //         // const ul = dropDown.current;
    //         const lis = ul.getElementsByTagName('li')
    //         onLiElements(lis);
    //     }

    // }, [menu]);


    return (
        <>
            <div className={style.sidebar}>
                <ul className={style.menu}>
                    <li><a href="lunbo.html"> <TeamOutlined />Create Group</a></li>
                    <li className={style.divider} >Menu</li>
                    <li>
                        {/* <a href="#" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a> */}
                        <a href="#" className={style.active} onClick={IsShow}> My Groups <CaretDownOutlined className={style.icon} /></a>
                        {!menu && <ul className={style.dropdown} ref={dropDown}>
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
                        </ul>}
                    </li>
                </ul>
            </div>
        </>
    );
}
export default Slider;


// import React, { useState, useRef, useEffect } from 'react';
// import { TeamOutlined, CaretDownOutlined } from '@ant-design/icons';

// const Slider = ({ onLiElements }) => {
//     const [menu, setMenu] = useState(false);
//     const dropDown = useRef(null);

//     const toggleMenu = () => {
//         setMenu(!menu);
//     };

//     useEffect(() => {
//         const lis = dropDown.current.getElementsByTagName('li');
//         onLiElements && onLiElements(lis);
//     }, [onLiElements]);

//     return (
//         <div className="slider">
//             <div className="menu-icon" onClick={toggleMenu}>
//                 <TeamOutlined />
//             </div>
//             <ul ref={dropDown} className={`dropdown-menu ${menu ? 'show' : ''}`}>
//                 <li>Create Group</li>
//                 <li onClick={toggleMenu}>
//                     My Groups
//                     <CaretDownOutlined />
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Slider;