import React from "react";
import { Input } from "antd";
import "../assets/styles/MyInput.css";
import { useEffect, useState } from "react";
// 输入框
export default function MyInput(props) {
    console.log("props", props);
    const { options, defaultValue, type, handleChange } = props;
    console.log(options, defaultValue, type, handleChange);
    const [defValue, setDefValue] = useState();
    const styleConfig = {
        width: options?.[0].width ? options[0].width : null,
        heigth: options?.[0].heigth ? options[0].heigth : null,
    };

    useEffect(() => {
        if (defaultValue) setDefValue(defaultValue);
    }, [defaultValue]);
    return (
        <>
            <Input
                className="update-ipt"
                allowClear={true}
                style={styleConfig}
                bordered={false}
                defaultValue={defValue}
                type={type}
                onChange={handleChange}
                key={defValue}
                id={options[0]?.value}
            ></Input>
        </>
    );
}
