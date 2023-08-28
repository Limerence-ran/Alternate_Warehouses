import React, { useState } from "react";
import LicenseKeyboard from "vehicle-plate-keyboard";
import "vehicle-plate-keyboard/dist/main.css";
import styles from "./main.module.css";
export default function Keyboard() {
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [value, setValue] = useState("");

    return (
        <>
            <div className={styles.search}>
                <div
                    style={{
                        color: "white",
                        height: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h4
                        style={{
                            color: "white",
                            fontFamily: "cursive",
                            fontSize: "20px",
                        }}
                    >
                        查询异常车辆
                    </h4>
                </div>

                <div
                    style={{
                        color: "white",
                        height: "15%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop:"5%"
                    }}
                >
                    <input
                        type="text"
                        required=""
                        placeholder="   请点击右侧键盘"
                        style={{
<<<<<<< HEAD
                            height: "95%",
                            width: "70%",
=======
                            height: "60%",
                            width: "72%",
>>>>>>> b348d702dceb220d2fb748dc31e0e22b3784a9dc
                            background: "transparent",
                        }}
                        readOnly
                        value={value}
                    />

                    <div className={styles.keyboard}>
                        <button
                            className={styles.button}
                            onClick={() => setShowKeyboard(!showKeyboard)}
                        >
                            {"车牌号⌨️"}
                        </button>

                        <LicenseKeyboard
                            visible={showKeyboard}
                            onChange={(value) => setValue(value)}
                            value={value}
                            done={() => setShowKeyboard(false)}
                            className={styles.custom_keyboard} // 应用自定义类名
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
