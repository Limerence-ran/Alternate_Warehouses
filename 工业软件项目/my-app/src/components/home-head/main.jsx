import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    FileSearchOutlined,
    CloudUploadOutlined,
    BellOutlined,
    SettingOutlined,
    IdcardOutlined,
} from "@ant-design/icons";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useRoutes,
} from "react-router-dom";

export default function HomeHead(props) {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const navigate = useNavigate();
    // const Upload = ()=>{
    //     navigate('/Update');
    // }
    console.log("props",props)
    const handleInputChange = (event) => {
        const searchText = event.target.value;
        setSearchText(searchText);
    };

    function setIdtoBuy(e) {
        const softId = e.target.gerAttribute("key"); // 需要传递的值
        const Navigate = useNavigate();
        Navigate.push(`/Buy/${softId}`); // 路由跳转并附带值
    }

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                axios
                    .post("http://39.98.41.126:31135/search", {
                        message: searchText,
                    })
                    .then((response) => {
                        const { code, msg, data } = response;

                        if (code === 1001) {
                            // 查询成功
                            console.log("数据:", data);
                            props.setSearch(data)
                            message.success(msg);
                            setSearchResults(response.data);
                        } else {
                            // 其他错误
                            message.error("查询失败: " + msg);
                        }
                    })
                    .catch((error) => {
                        console.log("请求出错", error);
                        message.error("请求出错");
                    });
            } catch (error) {
                console.error(error);
            }
        };

        fetchSearchResults();
    }, [searchText]);

    return (
        // <!-- 页头结构 -->
        <header className={styles.header_tab}>
            {/* <!-- tab栏导航模块 --> */}
            <div className={styles.tab_list}>
                {/* <!-- QG图片 --> */}
                <div className={styles.QG_img}>
                    <a href="javascript:void(0);">
                        <img
                            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
                            alt="QG"
                        />
                        <div className={styles.QG_studio}>
                            QG软件升级助手平台
                        </div>
                    </a>
                </div>

                {/* <!-- 搜索框功能 --> */}
                <div
                    className={`${styles.input_container} ${styles.result_container}`}
                >
                    <input
                        type="text"
                        name="text"
                        className={styles.input}
                        placeholder="search..."
                        onChange={handleInputChange}
                    />
                    <span className={styles.icon_search}>
                        <svg
                            width="19px"
                            height="19px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_bgCarrier">
                                <path
                                    opacity="1"
                                    d="M14 5H20"
                                    stroke="#000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    opacity="1"
                                    d="M14 8H17"
                                    stroke="#000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                                    stroke="#000"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    opacity="1"
                                    d="M22 22L20 20"
                                    stroke="#000"
                                    stroke-width="3.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </g>
                        </svg>
                    </span>
                    <div
                        className={`${styles.hotwords_container} ${styles.hot_keywords}`}
                    >
                        {searchResults.length > 0 && (
                            <ul className={styles.searchList}>
                                {searchResults.map((result) => (
                                    <li key={result.id} onClick={setIdtoBuy}>
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* <!-- 首页显示 --> */}
                <div>
                    <ul className={styles.tabul}>
                        <Link to={"/Home"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <HomeOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">首页</a>
                                </span>
                            </li>
                        </Link>

                        <Link to={"/Mysoftware"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <FileSearchOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">查看</a>
                                </span>
                            </li>
                        </Link>

                        <Link to={"/Update"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <CloudUploadOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">上传</a>
                                </span>
                            </li>
                        </Link>
                        <Link to={"/CheckUpdate"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <BellOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">更新</a>
                                </span>
                            </li>
                        </Link>

                        <Link to={"/Manageuser"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <SettingOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">管理</a>
                                </span>
                            </li>
                        </Link>
                        <Link to={"/UserPage"}>
                            <li className={styles.tabli}>
                                <span className={styles.spanicon}>
                                    <IdcardOutlined />
                                </span>
                                <span className={styles.switchtext}>
                                    <a href="#">个人</a>
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
}
