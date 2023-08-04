import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Checkbox, Select } from "antd";
import DynamicTable from "../../components/create-form/main";
const { Option } = Select;

function Chart5() {
    const [dems, setDems] = useState(1);
    const [isshow, setisShow] = useState(false);
    const [mydropdownValue, setMydropdownValue] = useState("");
    const [inputValues, setInputValues] = useState({
        a: "",
        b: "",
        c: "",
        d: "",
    });
    const [selectedOption, setSelectedOption] = useState("");

    const [showBInput, setShowBInput] = useState(false);
    const [showCInput, setShowCInput] = useState(false);
    const [showDInput, setShowDInput] = useState(false);

    const navigate = useNavigate();

    // 定义勾选框状态
    const [showDropdown, setShowDropdown] = useState(false);

    // 定义下拉框选项
    const dropdownOptions = [
        // { value: "option1", label: "Option 1" },
        // { value: "option2", label: "Option 2" },
        // { value: "option3", label: "Option 3" },
    ];
    //组件创建时调用的ajax函数
    const ajax = async (data) => {
        try {
            // 发送请求
            const response = await axios({
                url: "http://39.98.41.126:31130/resource/resource",
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"), // 替换为你的实际授权头部
                },
                data: {
                    id: localStorage.getItem("myGroupid"),
                },
            });

            // 处理成功状态
            const { data: responseData } = response.data;
            for (let j = 0; j < responseData.length; j++) {
                dropdownOptions[j].value = responseData[j].resourceName;
                dropdownOptions[j].label = responseData[j].resourceName;
            }
            setMydropdownValue(response.data.resourceName);
        } catch (error) {
            // 处理错误状态
            const { response } = error;
            if (response) {
                // 请求已发送，但是服务器响应状态码错误
                const { data: errorData } = response;
                message.error(errorData.message);
            } else {
                // 请求未发送，发生了网络错误等
                message.error("请求失败，请检查网络连接");
            }

            throw error; // 可以选择抛出错误，供调用者处理
        }
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
        setShowDropdown(e.target.checked);
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
    const radioGroup = document.querySelectorAll('input[name="algorithm"]');
    let selectedValue = 0; //获取到算法的值
    for (let i = 0; i < radioGroup.length; i++) {
        if (radioGroup[0].checked) {
            selectedValue = 0;
            break; // 停止循环，因为只需要获取一个选中的值
        } else {
            selectedValue = 1;
            break;
        }
    }
    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    useEffect(() => {
        ajax();
    }, []);

    const Onclickpage = () => {
        const input1Value = document.getElementById("input1").value;
        const input2Value = document.getElementById("input2").value;
        const input3Value = document.getElementById("input3").value;
        const input4Value = document.getElementById("input4").value;
        const values = [input1Value, input2Value, input3Value, input4Value];

        const dropdown1Value = document.getElementById("dropdown1").value;
        const dropdown2Value = document.getElementById("dropdown2").value;
        const dropdown3Value = document.getElementById("dropdown3").value;

        const dropdownvalues = [
            mydropdownValue,
            dropdown1Value,
            dropdown2Value,
            dropdown3Value,
        ];

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
            algorithmId: selectedValue, //选用算法
            resourceNames: dropdownvalues, //数据集名字
            resourceWeights: values, //数据集占比
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

    return (
        <>
            <div className={style.content}>
             <div className={style.Chart5}>
                    <div className={style.header}>
                        <span>IMDB Movie Reviews Dataset</span>
                    </div>
                    <main>
                        <div className={style.chartbox} >
                            <div className={style.chart}>

                            </div>
                            <div className={style.chartbuttom}>


                                <div className={style.radio}>
                                    <div className={style.usedataleft}><span>Please select the iteration mode you want:</span></div>
                                    <div className={style.usedataright}>
                                        <input type='radio' name="algorithm" /><span> Mean value algorith</span>
                                        <input type='radio' name="algorithm" /><span>Differential Algorithm</span>
                                    </div>
                                </div>
                                <div className={style.usedata}>
                                    <div className={style.usedataleft}><span>Please select the dataset you want to use: </span></div>
                                    <div className={style.useright1}>
                                        <div>  <input type="checkbox" /><span>Dataset b(3noise turned on)</span></div>
                                        <div> <input type="checkbox" /><span>Dataset c(1noise turned on) </span></div>
                                        <div> <input type="checkbox" /><span>Dataset d(2 noise turned on)</span></div>
                                    </div>
                                </div>
                                <div className={style.dataweight}>
                                    <div className={style.usedataleft}><span>Please select the weight of the other dataset:	 </span></div>
                                    <div className={style.useright}>
                                        <span>a<input type='text' />%</span>
                                        <span>b<input type='text' />%</span>
                                        <span>c<input type='text' />%</span>
                                        <span>d<input type='text' />%</span>
                                    </div>
                                </div>
                                <button className={style.next} onClick={Onclickpage}>Next</button>
                            </div>
                        </div>
                    </main>
             </div>
            </div>
        </>
    );
}

export default Chart5;
