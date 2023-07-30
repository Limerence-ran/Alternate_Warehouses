import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import axios from "axios";
import { message } from "antd";
import { Pagination } from "antd";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useRoutes,
} from "react-router-dom";

export default function HomeBody(props) {
    const [currentPage, setCurrentPage] = useState("1");
    const [databox, setDatabox] = useState([]);
    const PageSize = "6";

    useEffect(() => {
        axios
            .get(
                `http://39.98.41.126:31132/selectProducts/${currentPage}/${PageSize}`
            )
            .then((response) => {
                const { code, msg, data } = response;
                if (code === 1001) {
                    // 查询成功
                    console.log("数据:", data);
                    message.success(msg);
                    setDatabox(data.data);
                } else {
                    // 其他错误
                    message.error("查询失败: " + msg);
                }
            })
            .catch((error) => {
                console.log("请求出错", error);
                message.error("请求出错");
            });
    }, []);

    function handlePageChange(currentPage) {
        setCurrentPage(currentPage);
    }
    return (
        <div>
            <div className={styles.home}>
                <button className={styles.icon_home_top}>
                    <span>{props.title}</span>
                </button>
                <div
                    className={`${styles.tab_list} ${styles.book_wrapper} ${styles.clearfix}`}
                >
                    <ul>
                        {databox.map((item) => (
                            <li className={styles.book_item}>
                                <a href="#" title="nice-book">
                                    <div className={styles.panel_detail}>
                                        <div className={styles.bookface_img}>
                                            <img src={databox.picture} alt="" />
                                        </div>
                                        <span className={styles.book_price}>
                                            <i>Hot soft</i>
                                            {/* <!-- 收藏量 --> */}
                                        </span>
                                        <div className={styles.book_brief}>
                                            <h3>{databox.name}</h3>
                                            <div className={styles.book_quote}>
                                                {/* <!-- 描述 --> */}
                                                <p>{databox.description}</p>
                                            </div>
                                        </div>
                                        <div className={styles.pay}>
                                            <span></span>
                                            <Link to={"/Buy"}>
                                                <button
                                                    className={
                                                        styles.cssbuttons_io_button
                                                    }
                                                >
                                                    <svg
                                                        t="1690545060386"
                                                        class="icon"
                                                        viewBox="0 0 1024 1024"
                                                        version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        p-id="1511"
                                                        width="32"
                                                        height="32"
                                                        data-spm-anchor-id="a313x.7781069.0.i8"
                                                    >
                                                        <path
                                                            d="M694.26516 286.98827 512 469.254453 329.732793 286.98827c-8.287757-8.287757-21.724791-8.286734-30.012547 0.001023-8.286734 8.286734-8.286734 21.723767 0 30.011524l161.04486 161.043836-108.634186 0c-11.720949 0-21.221324 9.502421-21.221324 21.221324s9.501398 21.221324 21.221324 21.221324l139.000797 0 0 89.12997L363.803773 609.617271c-11.720949 0-21.221324 9.502421-21.221324 21.221324s9.501398 21.221324 21.221324 21.221324l127.328967 0 0 131.572618c0 11.718903 9.502421 21.221324 21.221324 21.221324s21.221324-9.502421 21.221324-21.221324L533.575388 652.059919l127.327944 0c11.719926 0 21.221324-9.502421 21.221324-21.221324S672.623257 609.617271 660.903332 609.617271L533.575388 609.617271l0-89.12997 138.999774 0c11.719926 0 21.221324-9.502421 21.221324-21.221324s-9.502421-21.221324-21.221324-21.221324L563.233871 478.044654l161.043836-161.043836c8.287757-8.287757 8.287757-21.724791 0-30.012547C715.987904 278.700513 702.554964 278.700513 694.26516 286.98827z"
                                                            fill="#ffffff"
                                                            p-id="1512"
                                                        ></path>
                                                        <path
                                                            d="M512 65.290005c-246.316965 0-446.709995 200.39303-446.709995 446.708971 0 246.316965 200.39303 446.709995 446.709995 446.709995s446.709995-200.39303 446.709995-446.709995C958.709995 265.683035 758.316965 65.290005 512 65.290005zM512 916.266323c-222.913952 0-404.267347-181.353394-404.267347-404.267347S289.086048 107.733677 512 107.733677s404.267347 181.352371 404.267347 404.266323S734.912929 916.266323 512 916.266323z"
                                                            fill="#ffffff"
                                                            p-id="1513"
                                                            data-spm-anchor-id="a313x.7781069.0.i7"
                                                            class="selected"
                                                        ></path>
                                                    </svg>
                                                    {databox.price}
                                                    <div
                                                        className={styles.icon}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                        >
                                                            <path
                                                                fill="none"
                                                                d="M0 0h24v24H0z"
                                                            ></path>
                                                            <path
                                                                fill="currentColor"
                                                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.Pagination}>
                <Pagination
                    style={{ height: "500px", position: "bottomLeft" }}
                    total={85}
                    showTotal={(total) => `Total ${total} items`}
                    defaultPageSize={20}
                    defaultCurrent={1}
                    onChange={handlePageChange}
                />
                <br />
            </div>
        </div>
    );
}
