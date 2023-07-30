import React from "react";
import styles from "./main.module.css";
import { UserOutlined, RocketOutlined } from "@ant-design/icons";

export default function HomeTab() {
    return (
        <div className={styles.tabbody}>
            <div className={styles.tabimg}>
                <div className={styles.tablogo}>QG STUDIO</div>
            </div>
            <div className={styles.searchbox}>
                <input
                    class={styles.input}
                    name="text"
                    placeholder="Search..."
                    type="search"
                />
                <RocketOutlined style={{width:"30px"}}/>
            </div>
            <div className={styles.userid}>
                <span className={styles.username}>Myself:8848-4399</span>
                <UserOutlined />
            </div>
        </div>
    );
}
