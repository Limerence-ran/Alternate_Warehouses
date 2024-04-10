import React, { useState } from "react";
import {
    Form,
    Radio,
    Input,
    Button,
    message,
    Modal,
    InputNumber,
    Select,
    Drawer,
    Divider,
    Space,
} from "antd";
import style from "./main.module.css"; // 导入自定义的CSS文件
import axios from "axios";
import { DatabaseOutlined, LineChartOutlined } from "@ant-design/icons";
import "./main.css";

//创建群组组件
const CreateGroup = () => {
    const [form] = Form.useForm();
    const [openbottom, setOpenbottom] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [GroupName, setGroupName] = useState("");
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [dem, setDem] = useState(1);
    // const [dimension, setDimension] = useState(1);
    const [arity, setArity] = useState([]);
    const [description, setDescription] = useState("");

    //处理抽屉事件
    const onClosebottomAndSubmit = () => {
        setOpenbottom(false);
    };
    const onClosebottom = () => {
        setOpenbottom(false);
    };
    const showbottomDrawer = () => {
        setOpenbottom(true);
    };

    // 定义 handleFinish 函数，用于处理完成后的操作
    const handleFinish = (values) => {
        // 设置提交标志为 true
        setIsSubmitting(true);
        // 获取参数
        const groupName = values.name;
        const dimension = values.text;
        const description = values.description;
        // 初始化 resourceFormat 变量
        const resourceFormat = [];
        // 遍历 values 对象，如果 key 不是数字，则将 value 添加到 resourceFormat 变量中
        for (let key in values) {
            if (!isNaN(key)) {
                resourceFormat.push(values[key]);
            }
        }
        // 调用 createGroup 函数，传递参数
        createGroup(groupName, dimension, resourceFormat, description);
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const createGroup = (
        groupName,
        dimension,
        resourceFormat,
        groupDescription
    ) => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        console.log(GroupName);
        axios
            .post(
                "http://39.98.41.126:31801/groups",
                // 要上传的群组信息
                {
                    groupName: GroupName,
                    dimension: dem,
                    resourceFormat: resourceFormat,
                    description: groupDescription,
                },
                {
                    headers: {
                        Authorization: token, // 使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { code, msg } = response.data;
                if (code === 1) {
                    message.success(msg);
                    // 模拟提交请求
                    setTimeout(() => {
                        setIsSubmitting(false);
                        setIsSuccessModalVisible(true);
                        form.resetFields();
                    }, 1000);
                } else {
                    setIsSubmitting(false);
                    message.error("Create failed:" + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                message.error("An error occurred in the request");
                setIsSubmitting(false);
                console.log("An error occurred in the request", error);
            });
    };

    return (
        <>
            <div className={style.content} id="CreateGroup">
                <main className={style.mainbox}>
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        initialValues={{
                            type: "collection", // 设置默认值为 "collection"
                            type: "select",
                        }}
                        layout="vertical"
                        className={style.formstyle}
                    >
                        <Form.Item
                            label="Group Name"
                            name="Group Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Group name",
                                },
                            ]}
                        >
                            <Input
                                className={style.inputstyle}
                                prefix={<DatabaseOutlined />}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Group Type"
                            name="Group Type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose Group type",
                                },
                            ]}
                        >
                            <div id="radio" className={style.radio}>
                                <Radio.Group
                                    defaultValue="collection"
                                    buttonStyle="solid"
                                >
                                    <Radio.Button value="collection">
                                        collection
                                    </Radio.Button>
                                    <Radio.Button value="individual">
                                        individual
                                    </Radio.Button>
                                </Radio.Group>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Group Dimension"
                            name="Group Dimension"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Dimension",
                                },
                            ]}
                        >
                            <InputNumber
                                className={style.inputstyle}
                                prefix={<LineChartOutlined />}
                                onChange={(e) => {
                                    setDem(e.target.value);
                                }}
                                min={1}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Select"
                            name="select"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose a dimension",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Arity Select"
                                name="select"
                                onChange={(value) => {
                                    const newArray = [
                                        ...Array(Number(value)),
                                    ].map(() => "");
                                    setArity(newArray);
                                }}
                            >
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                                <Select.Option value="3">3</Select.Option>
                                <Select.Option value="4">4</Select.Option>
                                <Select.Option value="5">5</Select.Option>
                                <Select.Option value="6">6</Select.Option>
                            </Select>
                        </Form.Item>

                        <Drawer
                            title="Please input Dimension Parameter"
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
                            <div className={style.parameters}>
                                {arity.map((value, index) => (
                                    <Form.Item
                                        name={index}
                                        key={index}
                                        className={style.parameters_input}
                                    >
                                        <Input
                                            value={value}
                                            onChange={(e) => {
                                                const newArray = [...arity];
                                                newArray[index] =
                                                    e.target.value;
                                                setArity(newArray);
                                            }}
                                        />
                                    </Form.Item>
                                ))}
                            </div>
                        </Drawer>

                        <Form.Item
                            label="Group Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Group description",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                style={{ resize: "none" }}
                                className={style.textareastyle}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div id="createbtn">
                                <Button
                                    style={{ flexBasis: "45%" }}
                                    type="primary"
                                    onClick={showbottomDrawer}
                                >
                                    Dimension Parameters
                                </Button>
                                <Button
                                    style={{ flexBasis: "45%" }}
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmitting}
                                    className={style.SubmitButton}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    <Modal
                        open={isSuccessModalVisible}
                        onCancel={handleSuccessModalClose}
                        onOk={handleSuccessModalClose}
                        okText="Close"
                        title="提交成功"
                        centered
                        className="success-modal-style"
                    >
                        <Divider></Divider>
                        <span>Submit success!</span>
                        <Divider></Divider>
                    </Modal>
                </main>
            </div>
        </>
    );
};

export default CreateGroup;
