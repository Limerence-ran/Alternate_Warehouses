import React from "react";
import styles from "./main.module.css";
import Liner from "../../components/地图/右侧盒子/右侧三图/车流量折线图";
import Liner1 from "../../components/地图/右侧盒子/右侧三图/利用率折线图";
import BarChart from "../../components/地图/右侧盒子/右侧三图/平均收入柱状图";
export default function EchartsDiv(props) {
    return (
        <>
            <div
                className={styles.card}
                style={{ width: props.cardwidth, height: props.cardheight }}
            >
                <div
                    className={styles.bg}
                    style={{ width: props.bgwidth, height: props.bgheight }}
                >
                    {props.type === "Liner" ? (
                        <Liner/>
                    ) : props.type === "Liner1" ? (
                            <Liner1/>
                    ) : props.type === "BarChart" ? (
                                <BarChart/>
                    ) : null}
                </div>
                <div
                    className={styles.blob}
                    style={{ width: props.blobwidth, height: props.blobheight }}
                ></div>
            </div>
        </>
    );
}
