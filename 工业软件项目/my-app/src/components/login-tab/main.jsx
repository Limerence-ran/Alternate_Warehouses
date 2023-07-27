import React from "react";
import styles from "./main.module.css";

export default function LoginTab() {
    return (
        <div className={styles.tabbody}>
            <div className={styles.tabimg}></div>
            <span className={styles.title}>QG STUDIO</span>
            <span className={styles.titlefont}>软件升级助手平台</span>
            <div class={styles.header_link}>
                <a href="javascript:void(0);">基本版</a>&nbsp;|&nbsp;
                <a href="javascript:void(0);">English</a>
                &nbsp;|&nbsp;
                <a href="javascript:void(0);">手机版</a>
                &nbsp;|&nbsp;
                <a href="javascript:void(0);">工作室邮箱</a>
            </div>
        </div>
    );
}
