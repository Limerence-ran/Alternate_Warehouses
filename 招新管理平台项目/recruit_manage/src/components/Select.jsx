import { Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import PubSub from "pubsub-js";
const { Option } = Select;

function MySelect(props) {
    const { options, sendvalue, defaultValue, changeValue } = props;
    const [defValue, setDefValue] = useState();
    let handleChange = (value, option) => {
        PubSub.publish("selectitem", `${value}:${option.children}`); // 区别所属的选择器
        PubSub.publish("group", option.key);
        if (sendvalue) sendvalue(option.value);
        if (changeValue) changeValue(option.value);
    };

    const styleConfig = {
        color: "#222631",
        backgroundColor: options[0].bgc ? options[0].bgc : "#fff",
        width: options?.[0].width ? options[0].width : "",
        height: options?.[0].heigth ? options[0].height : "32px",
        borderRadius: options?.[0].borderRadius
            ? options[0].borderRadius
            : null,
        marginLeft: options?.[0].marginLeft ? options[0].marginLeft : null,
    };

    useEffect(() => {
        if (defaultValue) setDefValue(defaultValue);
    }, defValue);

    if (!defValue) {
        return <></>;
    }

    return (
        <>
            <Select
                defaultValue={defValue}
                style={styleConfig}
                bordered={false}
                suffixIcon={<CaretDownOutlined />}
                dropdownMatchSelectWidth={false}
                onChange={handleChange}
                key={options[0].id}
            >
                {options.map((n) => (
                    <Option key={n?.id || n.key} value={n.value}>
                        {n.children}
                    </Option>
                ))}
            </Select>
        </>
    );
}

export default MySelect;
