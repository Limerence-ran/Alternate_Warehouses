import React from "react";
import { Input } from "antd";
import { useState, useEffect } from "react";
import "../assets/styles/MyTextarea.css";
const { TextArea } = Input;

export default function MyTextarea(props) {
    const { options, defaultValue } = props;
    const [defValue, setDefValue] = useState();
    const styleConfig = {
        width: options?.[0].width ? options[0].width : null,
        height: options?.[0].height ? options[0].height : null,
        minHeight: options?.[0].minHeight ? options[0].minHeight : null,
    };

    useEffect(() => {
        if (defaultValue) setDefValue(defaultValue);
    }, [defaultValue]);

    return (
        <>
            <TextArea
                className="update-text"
                bordered={false}
                style={styleConfig}
                defaultValue={defValue}
                key={defValue}
                //  allowClear={true}
            ></TextArea>
        </>
    );
}
