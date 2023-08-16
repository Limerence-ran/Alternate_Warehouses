import React, { useState } from "react";
import LicenseKeyboard from "vehicle-plate-keyboard";
import "vehicle-plate-keyboard/dist/main.css";
import styles from "./main.module.css";
export default function Keyboard() {
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className={styles.keyboard}>
            <button
                className={styles.button}
                onClick={() => setShowKeyboard(!showKeyboard)}
            >
                {"键盘⌨️"}
            </button>

            <p>{value}</p>
            <LicenseKeyboard
                visible={showKeyboard}
                onChange={(value) => setValue(value)}
                value={value}
                done={() => showKeyboard(false)}
            />
        </div>
    );
}
