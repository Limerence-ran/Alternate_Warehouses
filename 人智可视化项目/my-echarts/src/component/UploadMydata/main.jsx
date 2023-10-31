import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
    Button,
    Select,
    Divider,
    Drawer,
    Input,
    Space,
    Form,
    Popconfirm,
    Table,
    InputNumber,
    Typography,
    message,
    Modal,
} from "antd";
import Card01 from "../../components/card01/main.jsx";
import Card02 from "../../components/card02/main.jsx";
import Card03 from "../../components/card03/main.jsx";
import axios from "axios";

function UploadMyData() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isabled, setIsabled] = useState(false);
    function Disabled() {
        setIsabled(true);
    }
    function Abled() {
        setIsabled(false);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [data, setDataTabel] = useState([]);
    //定义我在群组中上传的资源
    const [formdata, setFormdata] = useState([]);
    const [openright, setOpenright] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState();
    const [resourceName, setResourceName] = useState("");
    const [editingKey, setEditingKey] = useState("");
    const [form] = Form.useForm();
    const navigate = useNavigate();
    //选择噪音
    const handleChange = (value) => {
        setNoiseLevel(value);
    };
    const handleChangeResourceName = (e) => {
        setResourceName(e.target.value);
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
                setDataTabel(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setDataTabel(newData);
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

    const showrightDrawer = (i) => {
        setOpenright(true);
    };
    const onCloseright = () => {
        setOpenright(false);
    };

    //组件创建时调用的ajax函数
    const ajax = async () => {
        try {
            //     发送请求
            const response = await axios({
                url: "http://39.98.41.126:31130/resource/resource",
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
                const keysArray = [];
                const valuesArray = [];
                setNoiseLevel(data.noiseLevel);
                setResourceName(data.resourceName);
                data.data.forEach((obj) => {
                    const key = Object.keys(obj)[0]; // 获取对象中的键
                    const value = Object.values(obj)[0]; // 获取对象中的值
                    keysArray.push(key);
                    valuesArray.push(value);
                });
                const resultArray = [keysArray, valuesArray];
                console.log(resultArray);
                setFormdata(resultArray);
                const originData = [];
                if (resultArray.length !== 0) {
                    for (let j = 0; j < resultArray[1][0].length; j++) {
                        let objectform = {
                            key: j.toString(),
                            dimension: `dimension ${j + 1}`,
                        };
                        for (let i = 0; i < resultArray[0].length; i++) {
                            objectform[resultArray[0][i]] =
                                resultArray[1][i][j];
                        }
                        originData.push(objectform);
                    }
                }
                setDataTabel(originData);
                console.log(originData);
            } else {
                message.error(msg);
            }
        } catch (error) {
            // 处理错误状态
            message.error(
                "The request failed, please check your network connection"
            );
        }
    };
    //查看当前群组的规定数据格式
    const ajaxNew = async () => {
        try {
            // 发送请求
            const response = await axios({
                url: "http://39.98.41.126:31130/dataVisualization/show",
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"), // 替换为你的实际授权头部
                },
                data: {
                    id: localStorage.getItem("myGroupid"),
                },
            });
            // 处理成功状态
            const { data, code } = response.data;
            if (code === 1) {
                message.success("Successfully");
                const valuesArray = [];
                for (let i = 0; i < data.resourceFormat.length; i++) {
                    const valueArray = [];
                    for (let i = 0; i < data.dimension; i++) {
                        valueArray.push("");
                    }
                    valuesArray.push(valueArray);
                }
                // 将keysArray和valuesArray数组转换成数组
                const resultArray = [data.resourceFormat, valuesArray];
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
                setDataTabel(originData);
            } else {
                message.error("Failed");
            }
        } catch (error) {
            // 处理错误状态
            message.error(
                "The request failed, please check your network connection"
            );
            console.log(error);
        }
    };

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

    //表格提交
    function handletoUpload() {
        //处理格式不正确问题
        if (resourceName === "") {
            message.error("Resource Name cannot be empty.");
            return;
        } else if (getTableData().length === 0) {
            message.error("Data cannot be empty.");
            return;
        }
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        const id = localStorage.getItem("myGroupid");
        if (getTableData().length === 0) {
            return;
        }
        console.log(id, getTableData(), noiseLevel, resourceName);
        axios
            .put(
                "http://39.98.41.126:31130/resource",
                {
                    groupId: id,
                    data: [getTableData()],
                    noiseLevel: noiseLevel,
                    resourceName: resourceName,
                    type: "commercial",
                },
                {
                    headers: {
                        Authorization: token, //使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { code, msg } = response.data;
                if (code === 1) {
                    message.success("Save successfully : " + msg);
                    onCloseright();
                } else {
                    message.error("Create failed");
                }
            })
            .catch((error) => {
                message.error("An error occurred in the request");
                console.log("An error occurred in the request", error);
            });
    }

    return (
        <>
            <div className={style.upload}>
                <Divider
                    style={{
                        position: "absolute",
                        top: "4%",
                    }}
                />
                <div className={style.chartbox}>
                    <div
                        onClick={() => {
                            showrightDrawer();
                            ajax();
                            Disabled();
                        }}
                    >
                        <Card01 />
                    </div>
                    <div
                        onClick={() => {
                            showrightDrawer();
                            ajaxNew();
                            Abled();
                        }}
                    >
                        <Card02 />
                    </div>
                    <Card03 />
                    <Drawer
                        title="Upload Your Data"
                        placement="right"
                        size="large"
                        width={1000}
                        onClose={onCloseright}
                        open={openright}
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={showModal}
                                >
                                    Basic information
                                </Button>
                                <Modal
                                    title="Basic information"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                >
                                    <Divider></Divider>
                                    <Select
                                        defaultValue={
                                            noiseLevel ? noiseLevel : "1"
                                        }
                                        style={{
                                            width: "100%",
                                        }}
                                        disabled={isabled}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "1",
                                                label: "1",
                                            },
                                            {
                                                value: "2",
                                                label: "2",
                                            },
                                            {
                                                value: "3",
                                                label: "3",
                                            },
                                        ]}
                                    />
                                    <Divider></Divider>
                                    <Input
                                        placeholder={resourceName}
                                        max={15}
                                        disabled={isabled}
                                        onClick={handleChangeResourceName}
                                    ></Input>
                                    <Divider></Divider>
                                </Modal>
                                <Button onClick={onCloseright}>Cancel</Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        handletoUpload();
                                    }}
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
            </div>
        </>
    );
}

export default UploadMyData;
