import React from "react";
import styles from "./main.module.css";
import { UserOutlined, RocketOutlined } from "@ant-design/icons";

export default function HomeTab() {
    const username = localStorage.getItem("username");
    return (
        <div className={styles.tabbody}>
            <div className={styles.tabbody_box}>
                <div className={styles.tabimg}></div>
                <div className={styles.tablogo}>QG STUDIO</div>
                <div className={styles.searchbox}>
                    {/* <input
                        className={styles.input}
                        name="text"
                        placeholder="Search..."
                        type="search"
                    />
                    <RocketOutlined style={{ width: "30px" }} /> */}
                </div>
                <div className={styles.userid}>
                    <span className={styles.username}>Myself:{username}</span>
                    <UserOutlined />
                </div>
            </div>
        </div>
    );
}
