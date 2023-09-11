import React, { useState, useRef, useEffect } from "react";
import {
    TeamOutlined,
    CaretDownOutlined,
    FireOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
function Slider() {
    const navigate = useNavigate();
    // const dropDown = useRef(null);
    // const [menu, setMenu] = useState(true);
    // const IsShow = () => {
    //     setMenu(!menu);
    // };
    function CreateGroup() {
        // 跳转到创建组页面
        navigate("CreateGroup");
    }
    function MyGroup() {
        // 跳转到我的组页面
        navigate("Group");
    }
    function HotGroup() {
        // 跳转到热门组页面
        navigate("HotGroup");
    }
    return (
        <>
            <div className={style.sidebar}>
                <ul className={style.menu}>
                    <li className={style.divider}>Menu</li>
                    <li onClick={CreateGroup}>
                        <a href="javascript:;">
                            <UsergroupAddOutlined />
                            Create Group
                        </a>
                    </li>

                    <li onClick={HotGroup}>
                        <a href="javascript:;">
                            <FireOutlined />
                            Hot Groups{" "}
                        </a>
                    </li>
                    <li onClick={MyGroup}>
                        <a href="javascript:;">
                            {" "}
                            <TeamOutlined />
                            My Groups{" "}
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default Slider;
