import React from "react";
import styles from "./main.module.css";

export default function HomeFoot() {
    return (
        // <!-- 页脚结构 -->
        <footer className={styles.footer_content}>
            <div className={styles.footer_content__other_links}>
                <a href="#" title="QG招新">
                    <div>QG招新</div>
                    <div
                        className={
                            styles.footer_content__other_links__item_line
                        }
                    ></div>
                </a>
                <a href="#" title="移动应用">
                    <div>移动应用</div>
                    <div
                        className={
                            styles.footer_content__other_links__item_line
                        }
                    ></div>
                </a>
                <a href="#" title="关于我们">
                    <div>关于我们</div>
                    <div
                        className={
                            styles.footer_content__other_links__item_line
                        }
                    ></div>
                </a>
                <a href="#" title="反馈问题">
                    <div>反馈问题</div>
                    <div
                        className={
                            styles.footer_content__other_links__item_line
                        }
                    ></div>
                </a>
            </div>
            <div className={styles.footer_content__copyright_eng}>
                Copyright © 2022-2023 QG-studio. All Rights Reserved.
            </div>
            <div className={styles.footer_content__copyright_txt}>
                QG工作室 版权所有
            </div>
        </footer>
    );
}
