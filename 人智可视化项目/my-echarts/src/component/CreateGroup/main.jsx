import React, { useState } from "react";
import { Form, Radio, Input, Button, message, Modal } from "antd";
import style from "./main.module.css"; // 导入自定义的CSS文件
import axios from "axios";

const CreateGroup = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    // const [dimension, setDimension] = useState(1);
    const [arity, setArity] = useState([]);
    const [description, setDescription] = useState("");

    const handleFinish = (values) => {
        setIsSubmitting(true);
        console.log(values);
        const groupName = values.name;
        const dimension = values.text;
        const description = values.description;

        const resourceFormat = [];
        for (let key in values) {
            if (!isNaN(key)) {
                resourceFormat.push(values[key]);
            }
        }

        // 调用 createGroup 函数，传递参数
        createGroup(groupName, dimension, resourceFormat, description);

        // 模拟提交请求
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccessModalVisible(true);
            form.resetFields();
        }, 2000);
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

        axios
            .post(
                "http://39.98.41.126:31130/groups",
                // 要上传的群组信息
                {
                    groupName: groupName,
                    dimension: dimension,
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
                const { code, msg, data } = response;
                if (code === 1) {
                    message.success(msg);
                    console.log("data:" + data);
                } else {
                    message.error("创建失败: " + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    };

    return (
        <>
            <div className={style.content} id="CreateGroup">
                <main className={style.mainbox}>
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        layout="vertical"
                        className={style.formstyle}
                    >
                        <Form.Item
                            label="Group name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Group name",
                                },
                            ]}
                        >
                            <Input className={style.inputstyle} />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Group type",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio
                                    value="collection"
                                    className="round_radio_button"
                                >
                                    collection
                                </Radio>
                                <Radio
                                    value="individual"
                                    className="round_radio_button"
                                >
                                    individual
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Input Dimension "
                            name="text"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Dimension",
                                },
                            ]}
                        >
                            <input className={style.inputstyle} />
                        </Form.Item>

                        <Form.Item
                            label="Dimension parameters "
                            name="parameters"
                            rules={[
                                {
                                    // required: true,
                                    message: "Please input  Parameters",
                                },
                            ]}
                        >
                            <span>
                                Arity Select:
                                <select
                                    onChange={(e) => {
                                        const selectedDimension = parseInt(
                                            e.target.value
                                        );
                                        // setDimension(selectedDimension);
                                        setArity(
                                            Array(selectedDimension).fill("")
                                        );
                                    }}
                                    className={style.option}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </span>
                            <span className={style.parameters}>
                                Please input parameters name :
                            </span>
                            <span className={style.parameters}>
                                {arity.map((value, index) => (
                                    <Form.Item
                                        name={index}
                                        key={index}
                                        className={style.parameters_input}
                                    >
                                        <input
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
                            </span>
                        </Form.Item>

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

                        <Form.Item className={style.Submitbtn}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                className={style.SubmitButton}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <Modal
                        visible={isSuccessModalVisible}
                        onCancel={handleSuccessModalClose}
                        onOk={handleSuccessModalClose}
                        okText="Close"
                        title="提交成功"
                        centered
                        className="success-modal-style"
                    >
                        <p>submit success！</p>
                    </Modal>
                </main>
            </div>
        </>
    );
};

export default CreateGroup;
