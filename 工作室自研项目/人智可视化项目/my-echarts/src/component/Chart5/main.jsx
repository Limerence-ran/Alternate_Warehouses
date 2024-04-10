import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {
    message,
    Radio,
    Select,
    Tag,
    Input,
    Form,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Drawer,
    Space,
    Button,
    Steps,
} from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import Vedio from "../../component/Vedio/main";
import "./main.css";

function Chart5() {
    //定义权重输入的值
    const [inputValues, setInputValues] = useState({});
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");
    //定义我在群组中可用的资源
    const [resourcenamedata, setResourcenamedata] = useState([]);
    //定义我在群组中上传的资源
    const [formdata, setFormdata] = useState([]);
    //定义加载框
    const [isshow, setisShow] = useState(false);
    //定义步骤条
    const [current, setCurrent] = useState(0);
    //定义选择的数据集
    const [selectedOption, setSelectedOption] = useState([]);
    //定义选择的交流次数
    const [SelectedInteractNumOption, setSelectedInteractNumOption] =
        useState(0);
    //定义选择的权重
    const [weight, setWeight] = useState([]);
    //定义算法
    const [selectedValue, setSelectedValue] = useState(0);
    //定义路由函数
    const navigate = useNavigate();
    // 定义下拉框选项
    const options = resourcenamedata;
    //定义输入框限制事件
    const handleInputChange = (value, index) => {
        const newValues = { ...inputValues };
        newValues[index] = value;
        setInputValues(newValues);
        console.log(newValues);
    };
    //定义输入计算函数
    const getSum = () => {
        let sum = 0;
        for (const key in inputValues) {
            sum += parseInt(inputValues[key]) || 0;
        }
        return sum;
    };
    //定义下拉框搜索事件
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color="blue"
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };
    // 多选框选择改变时的回调函数
    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };
    //单选框选择改变时的回调函数
    const handleSelectInteractNumChange = (value) => {
        setSelectedInteractNumOption(value);
    };

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        record,
        index,
        children,
        ...restProps
    }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    //定义表格编辑与删除功能
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        let clearobj = {
            ...record,
        };
        form.setFieldsValue(clearobj);
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "dimension",
            dataIndex: "dimension",
            width: "15%",
            editable: false,
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    if (formdata.length !== 0) {
        formdata[0].map((item) => {
            return columns.splice(columns.length - 1, 0, {
                title: item,
                dataIndex: item,
                width: "15%",
                editable: true,
            });
        });
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "number",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //定义表格提交事件
    const getTableData = () => {
        const tableData = {};
        // 遍历每一列
        columns.forEach((column, columnIndex) => {
            const { dataIndex } = column;
            // 跳过第一列和最后一列
            if (columnIndex === 0 || columnIndex === columns.length - 1) {
                return;
            }
            const columnData = [];
            // 遍历每一行
            data.forEach((record) => {
                columnData.push(record[dataIndex]);
            });
            // 将列名作为键，该列下的每行数据作为值
            tableData[dataIndex] = columnData;
        });

        // 返回处理后的数据
        return tableData;
    };

    //定义算法提交事件
    const handleRadioChange = (e) => {
        e.target.value === "Mean Value Algorithm"
            ? setSelectedValue(0)
            : setSelectedValue(1);
    };

    //定义右边抽屉
    const [openright, setOpenright] = useState(false);
    const [openbottom, setOpenbottom] = useState(false);
    const showrightDrawer = () => {
        setOpenright(true);
    };
    const showbottomDrawer = () => {
        setOpenbottom(true);
    };
    const onCloseright = () => {
        setOpenright(false);
    };
    const onClosebottom = () => {
        setOpenbottom(false);
    };
    const formRef = useRef(); // 创建一个表单引用
    const onClosebottomAndSubmit = () => {
        setOpenbottom(false);
        const form = formRef.current;
        form.validateFields().then((values) => {
            setWeight(Object.values(values));
        });
    };
    //组件创建时调用的ajax函数
    const ajax = async () => {
        try {
            // 发送请求
            const response = await axios({
                url: "http://39.98.41.126:31801/resource/resource",
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("token"), // 替换为你的实际授权头部
                },
                data: {
                    id: localStorage.getItem("myGroupid"),
                },
            });
            // 处理成功状态
            const { data, code, msg } = response.data;
            if (code === 1) {
                message.success("Data request successful");
                // 创建一个空数组用于存放key和value
                const keysArray = [];
                const valuesArray = [];
                // 遍历data中的每一个对象
                data.data.forEach((obj) => {
                    // 获取对象中的键
                    const key = Object.keys(obj)[0]; // 获取对象中的键
                    // 获取对象中的值
                    const value = Object.values(obj)[0]; // 获取对象中的值
                    // 将key和value添加到keysArray和valuesArray数组中
                    keysArray.push(key);
                    valuesArray.push(value);
                });
                // 将keysArray和valuesArray数组转换成数组
                const resultArray = [keysArray, valuesArray];
                // 设置表单数据
                setFormdata(resultArray);
                // 创建一个空数组用于存放key和value
                const originData = [];
                // 如果resultArray数组不为空
                if (resultArray.length !== 0) {
                    // 遍历resultArray中的每一个元素
                    for (let j = 0; j < resultArray[1][0].length; j++) {
                        // 创建一个对象
                        let objectform = {
                            key: j.toString(),
                            dimension: `dimension ${j + 1}`,
                        };
                        // 遍历resultArray中的每一个元素，将其中的key和value添加到对象中
                        for (let i = 0; i < resultArray[0].length; i++) {
                            objectform[resultArray[0][i]] =
                                resultArray[1][i][j];
                        }
                        // 将对象添加到originData数组中
                        originData.push(objectform);
                    }
                }
                // 设置数据
                setData(originData);
            } else {
                // 如果resultArray数组为空，则报错
                message.error(msg);
            }
        } catch (error) {
            // 处理错误状态
            message.error(
                "The request failed, please check your network connection"
            );
            throw error; // 可以选择抛出错误，供调用者处理
        }
    };

    //获取数据集名字
    const getresourceName = () => {
        const groupid = localStorage.getItem("myGroupid");
        const usedata = (groupid) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31801/resource/resource",
                    // 要上传的群组信息
                    {
                        id: groupid,
                    },
                    {
                        headers: {
                            Authorization: token, // 使用从本地存储中获取的 token
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    const { code, msg, data } = response.data;
                    if (code === 1) {
                        let resourceNameData = [];
                        data.data.map((item) => {
                            resourceNameData.push({ value: item.resourceName });
                        });
                        setResourcenamedata(resourceNameData);
                    } else {
                        message.error(msg);
                    }
                })
                .catch((error) => {
                    message.error("An error occurred in the request");
                    console.log(error);
                });
        };
        usedata(groupid);
    };

    useEffect(() => {
        //查看我在群组中上传的资源
        ajax();
        //查看群组中我能用到的资源
        getresourceName();
        //定义表格数据
    }, []);

    const Onclickpage = () => {
        //处理格式不正确问题
        if (selectedOption.length === 0) {
            message.error("Resource data cannot be empty.");
            return;
        } else if (SelectedInteractNumOption === 0) {
            message.error("Please select the number of communication times.");
            return;
        } else if (getSum() !== 100) {
            message.error("The sum of weights must be 100.");
            return; // 阻止继续执行关闭逻辑
        }

        //发送ajax请求
        const request = async (requestData) => {
            try {
                const response = await axios.post(
                    "http://39.98.41.126:31801/resource/forward/operation",
                    requestData,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"), // 替换为你的实际授权头部
                            "Content-Type": "application/json", // 设置请求内容类型
                        },
                    }
                );
                return response.data;
            } catch (error) {
                // 请求发生错误时的处理
                message.error("An error occurred in the request");
                throw error;
            }
        };

        request({
            data: [getTableData()],
            groupId: localStorage.getItem("myGroupid"),
            algorithmId: selectedValue, //选用算法
            resourceNames: selectedOption, //数据集名字
            resourceWeights: weight, //数据集权重
            interactNum: SelectedInteractNumOption,
        })
            .then((responseData) => {
                const { code, data } = responseData; // 获取返回的状态码
                // 处理返回的数据
                if (code === 1) {
                    message.success("Data request successful");
                    setisShow(!isshow);
                    setTimeout(() => {
                        navigate("/Chartdata/Chart2", {
                            state: {
                                data: data, // 将数据作为state属性传递给目标组件
                            },
                        });
                    }, 1000);
                }
            })
            .catch((error) => {
                // 错误处理
                console.error(error);
            });
    };

    return (
        <>
            <div className={style.content} id="content">
                <div className={style.Chart5}>
                    {/* 标题 */}
                    <div className={style.header}>
                        <span>
                            Differential Privacy Data Processing Visualization
                            Center
                        </span>
                    </div>
                    {/* 步骤条 */}
                    <div className={style.steps}>
                        <Steps
                            current={current}
                            direction="vertical"
                            items={[
                                {
                                    title: "Step 1",
                                    description: "Upload Data",
                                },
                                {
                                    title: "Step 2",
                                    description: "Change Alogrithm",
                                },
                                {
                                    title: "Step 3",
                                    description: "Change UsedData",
                                },
                                {
                                    title: "Step 4",
                                    description: "Set Data Iterations",
                                },
                                {
                                    title: "Step 5",
                                    description: "Set Data Weight",
                                },
                            ]}
                        />
                    </div>
                    {/* 表单 */}
                    <div className={style.chartbox}>
                        <div
                            className={style.chart}
                            onClick={() => {
                                setCurrent(0);
                            }}
                        >
                            <div id="chart">
                                <Button
                                    type="primary"
                                    onClick={showrightDrawer}
                                >
                                    The Data to be Uploaded
                                </Button>
                            </div>
                            <Drawer
                                title="The Data to be Uploaded"
                                placement="right"
                                size="large"
                                width={1000}
                                onClose={onCloseright}
                                open={openright}
                                extra={
                                    <Space>
                                        <Button onClick={onCloseright}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={onCloseright}
                                        >
                                            OK
                                        </Button>
                                    </Space>
                                }
                            >
                                <Form form={form} component={false}>
                                    <Table
                                        //覆盖默认的table元素
                                        components={{
                                            body: {
                                                cell: EditableCell,
                                            },
                                        }}
                                        bordered
                                        dataSource={data}
                                        columns={mergedColumns}
                                        rowClassName="editable-row"
                                        pagination={{
                                            onChange: cancel,
                                        }}
                                    />
                                </Form>
                            </Drawer>
                        </div>
                        <div
                            className={style.radio}
                            id="radio"
                            onClick={() => {
                                setCurrent(1);
                            }}
                        >
                            {/* 选择算法 */}
                            <Radio.Group
                                defaultValue="Mean Value Algorithm"
                                buttonStyle="solid"
                                onChange={handleRadioChange}
                            >
                                <Radio.Button value="Mean Value Algorithm">
                                    Mean Value Algorithm
                                </Radio.Button>
                                <Radio.Button value="Differential Algorithm">
                                    Differential Algorithm
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        {/* 选择数据集 */}
                        <div
                            className={style.usedata}
                            onClick={() => {
                                setCurrent(2);
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Select
                                    maxTagCount={7}
                                    maxTagTextLength={7}
                                    mode="multiple"
                                    tagRender={tagRender}
                                    style={{
                                        width: "80%",
                                    }}
                                    options={options}
                                    onChange={handleSelectChange}
                                />
                            </div>
                        </div>
                        {/* 选择交流次数 */}
                        <div
                            className={style.useexchangesnumber}
                            onClick={() => {
                                setCurrent(3);
                            }}
                        >
                            <Select
                                style={{
                                    width: "80%",
                                }}
                                onChange={handleSelectInteractNumChange}
                                allowClear
                                options={[
                                    {
                                        value: "1",
                                    },
                                    {
                                        value: "2",
                                    },
                                    {
                                        value: "3",
                                    },
                                    {
                                        value: "4",
                                    },
                                    {
                                        value: "5",
                                    },
                                ]}
                            />
                        </div>
                        {/* 输入数据集权重 */}
                        <div
                            className={style.dataweight}
                            onClick={() => {
                                setCurrent(4);
                            }}
                        >
                            <div id="dataweight">
                                <Button
                                    type="primary"
                                    onClick={showbottomDrawer}
                                >
                                    The weight of the datas
                                </Button>
                            </div>
                            <Drawer
                                title="The weight of the datas"
                                placement="bottom"
                                size="large"
                                height={500}
                                onClose={onClosebottom}
                                open={openbottom}
                                extra={
                                    <Space>
                                        <Button onClick={onClosebottom}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={onClosebottomAndSubmit}
                                        >
                                            OK
                                        </Button>
                                    </Space>
                                }
                            >
                                <Form ref={formRef}>
                                    <Form.Item key="me" name={`input_me`}>
                                        <InputNumber
                                            addonBefore={<PieChartOutlined />}
                                            prefix="My Data Weight | "
                                            suffix="%"
                                            min={1}
                                            size="middle"
                                            placeholder="number"
                                            style={{
                                                width: "100%",
                                            }}
                                            onChange={(value) =>
                                                handleInputChange(value, "me")
                                            }
                                        />
                                    </Form.Item>
                                    {selectedOption.map((value, index) => (
                                        <Form.Item
                                            key={index}
                                            name={`input_${index}`}
                                        >
                                            <InputNumber
                                                addonBefore={
                                                    <PieChartOutlined />
                                                }
                                                prefix={`${value} | `}
                                                onChange={(value) =>
                                                    handleInputChange(
                                                        value,
                                                        index
                                                    )
                                                }
                                                suffix="%"
                                                min={1}
                                                size="middle"
                                                placeholder="number"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    ))}
                                </Form>
                            </Drawer>
                        </div>
                    </div>
                    <Button className={style.next} onClick={Onclickpage}>
                        Next
                    </Button>
                </div>
                {isshow && <Vedio />}
            </div>
        </>
    );
}

export default Chart5;
