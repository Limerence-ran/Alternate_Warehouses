import React from "react";
import styles from "./main.module.css";
import Liner from "../map/rightBox/rightCharts/flowLine";
import Liner1 from "../map/rightBox/rightCharts/usageLine";
import BarChart from "../map/rightBox/rightCharts/AverageIncomeBar";
import Keyboard from "../../components/keyboard/main";
export default function EchartsDiv(props) {
    return (
        <>
            <div
                className={styles.card}
                style={{ width: props.cardwidth, height: props.cardheight }}
            >
                <div
                    className={styles.bg}
                    style={{
                        width: props.bgwidth,
                        height: props.bgheight,
                        top: props.bgtop,
                    }}
                >
                    {props.type === "Liner" ? (
                        <Liner/>
                    ) : props.type === "Liner1" ? (
                            <Liner1/>
                    ) : props.type === "BarChart" ? (
                        <BarChart />
                    ) : props.type === "Keyboard" ? (
                        <Keyboard />
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
