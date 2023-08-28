import React from "react";
import styles from "./main.module.css";

export default function LoginDemo() {
    return (
        <div className={styles.login_demo_left}>
            <div className={styles.login_demo_left_img}>
                <div className={styles.login_demo2}></div>
                <div className={`${styles.login_demo1} ${styles.index1}`}></div>
                <div className={`${styles.login_demo1} ${styles.index2}`}></div>
                <div className={`${styles.login_demo1} ${styles.index3}`}></div>
                <div className={`${styles.login_demo1} ${styles.index4}`}></div>
                <div className={`${styles.login_demo1} ${styles.index5}`}></div>
            </div>
        </div>
    );
}
