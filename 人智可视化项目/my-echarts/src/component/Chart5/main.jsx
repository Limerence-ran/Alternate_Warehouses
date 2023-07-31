import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Divider, Space, Tag } from "antd";
import DynamicTable from "../../components/create-form/main";

function Chart5() {
    const [dems, setDems] = useState(1);
    const [isshow, setisShow] = useState(false);
    const tableData = localStorage.getItem("tableData");
    const [inputValues, setInputValues] = useState({
        a: "",
        b: "",
        c: "",
        d: "",
    });

    const [showBInput, setShowBInput] = useState(false);
    const [showCInput, setShowCInput] = useState(false);
    const [showDInput, setShowDInput] = useState(false);

    const navigate = useNavigate();

    const Onclickpage = () => {
        //发送ajax请求

        const request = async (requestData) => {
            try {
                const response = await axios.post(
                    "http://39.98.41.126:31130/resource/forward/operation",
                    requestData
                );
                const data = response.data;
                // 在这里处理返回的数据
                return data;
            } catch (error) {
                // 请求发生错误时的处理
                message.error("请求发生错误，请重试！");
                throw error;
            }
        };

        request({
            data: localStorage.getItem("tableData"),
            groupId: localStorage.getItem("myGroupid"),
            algorithmId: 1, //选用算法
            resourceNames: ["2332", "draw"], //数据集名字
            resourceWeights: [70, 30, 51], //数据集占比
        })
            .then((responseData) => {
                // 处理返回的数据
                if (code === 1) {
                    console.log(responseData);
                    message.success("请求成功！");
                    localStorage.setItem("data-xy", responseData.data);
                    setisShow(!isshow);
                    setTimeout(() => {
                        navigate("/Chartdata/Chart2");
                    }, 3000);
                }
            })
            .catch((error) => {
                // 错误处理
                console.error(error);
            });
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: value,
        }));
    };

    const handleCheckboxChange = (e, field) => {
        const { checked } = e.target;

        if (field === "b") {
            setShowBInput(checked);
        } else if (field === "c") {
            setShowCInput(checked);
        } else if (field === "d") {
            setShowDInput(checked);
        }

        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [field]: checked ? "" : inputValues[field],
        }));
    };

    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox}>
                        <div className={style.chart}>
                            <div className={style.chart}>
                                用户使用协议 更新日期：2023年07月31日
                                欢迎使用我们的大数据服务！在使用之前，请仔细阅读以下用户使用协议（以下简称“本协议”）。当您点击同意或使用我们的服务时，即表示您已充分理解并同意遵守本协议的所有条款和条件。如果您不同意本协议，请停止使用我们的服务。
                                服务内容 1.1
                                我们提供大数据服务，包括但不限于数据分析、数据挖掘、数据可视化等功能。
                                1.2
                                您可以根据实际需求选择合适的服务套餐，并支付相应的费用。
                                1.3
                                我们将尽力保障服务的安全、稳定、可靠性，但无法对其他因素造成的服务中断或延迟承担责任。
                                用户责任 2.1
                                您应当按照国家法律法规和本协议约定使用我们的服务，不得利用服务从事任何违法、违规或侵权行为。
                                2.2 您应当妥善保管您的账号和密码，不得将其泄
                            </div>
                        </div>
                        <div className={style.chartbuttom}>
                            <div className={style.radio}>
                                <div className={style.usedataleft}>
                                    <span>
                                        Please select the iteration mode you
                                        want:
                                    </span>
                                </div>
                                <div className={style.usedataright}>
                                    <input type="radio" name="algorithm" />
                                    <span> Mean value algorithm</span>
                                    <input type="radio" name="algorithm" />
                                    <span>Differential Algorithm</span>
                                </div>
                            </div>
                            <div className={style.usedata}>
                                <div className={style.usedataleft}>
                                    <span>
                                        Please select the dataset you want to
                                        use:
                                    </span>
                                </div>
                                <div className={style.useright1}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleCheckboxChange(e, "b")
                                            }
                                        />
                                        <span>
                                            Dataset b(3 noise turned on)
                                        </span>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleCheckboxChange(e, "c")
                                            }
                                        />
                                        <span>
                                            Dataset c(1 noise turned on){" "}
                                        </span>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleCheckboxChange(e, "d")
                                            }
                                        />
                                        <span>
                                            Dataset d(2 noise turned on)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={style.dataweight}>
                                <div className={style.usedataleft}>
                                    <span>
                                        Please select the weight of the other
                                        dataset:{" "}
                                    </span>
                                </div>
                                <div className={style.useright}>
                                    <span>
                                        a
                                        <input
                                            type="text"
                                            value={inputValues.a}
                                            onChange={(e) =>
                                                handleInputChange(e, "a")
                                            }
                                        />
                                        %
                                    </span>
                                    {showBInput && (
                                        <span>
                                            b
                                            <input
                                                type="text"
                                                value={inputValues.b}
                                                onChange={(e) =>
                                                    handleInputChange(e, "b")
                                                }
                                            />
                                            %
                                        </span>
                                    )}
                                    {showCInput && (
                                        <span>
                                            c
                                            <input
                                                type="text"
                                                value={inputValues.c}
                                                onChange={(e) =>
                                                    handleInputChange(e, "c")
                                                }
                                            />
                                            %
                                        </span>
                                    )}
                                    {showDInput && (
                                        <span>
                                            d
                                            <input
                                                type="text"
                                                value={inputValues.d}
                                                onChange={(e) =>
                                                    handleInputChange(e, "d")
                                                }
                                            />
                                            %
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                className={style.next}
                                onClick={Onclickpage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </main>
                {isshow && <Vedio />}
            </div>
        </>
    );
}

export default Chart5;
