import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Space } from "antd";
import {
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import "./main.css";
import { message, Tag, notification } from "antd";
import axios from "axios";

const Abouttable = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (record) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button
                    type="dashed"
                    danger
                    size="small"
                    onClick={() => {
                        api.destroy();
                        Reject(record);
                    }}
                >
                    Reject
                </Button>
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        api.destroy();
                        Agree(record);
                    }}
                >
                    Agree
                </Button>
            </Space>
        );
        api.open({
            message: "Notification Title",
            description:
                'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            key,
            onClose: close,
        });
    };

    const fetchData = () => {
        setLoading(true);
        let groupid = localStorage.getItem("myGroupid");
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        axios
            .post(
                `http://39.98.41.126:31130/users/readMessages`,
                {
                    groupId: groupid,
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
                    setData(data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 200,
                        },
                    });
                    // 查询成功
                    message.success("Query success" + msg);
                } else {
                    // 其他错误
                    message.error("Query failure " + msg);
                }
            })
            .catch((error) => {
                message.error("Request error");
                console.log("请求出错", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const Agree = (record) => {
        const groupId = localStorage.getItem("myGroupid");
        const username = record.username;
        const AgreeApply = (groupId, username) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31130/users/processApplication",
                    // 要上传的群组信息
                    {
                        groupId: groupId,
                        username: username,
                        operate: "1",
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
                    } else {
                        message.error("Processing failed: " + msg);
                        // 在这里处理其他错误情况的逻辑
                    }
                })
                .catch((error) => {
                    message.error("There is a problem with the network");
                    console.log("There is a problem with the network", error);
                });
        };
        AgreeApply(groupId, username);
    };
    const Reject = (record) => {
        const groupId = localStorage.getItem("myGroupid");
        const username = record.username;
        const RejectApply = (groupId, username) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token

            axios
                .post(
                    "http://39.98.41.126:31130/users/processApplication",
                    // 要上传的群组信息
                    {
                        groupId: groupId,
                        username: username,
                        operate: "2",
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
                    } else {
                        message.error("Processing failed:" + msg);
                        // 在这里处理其他错误情况的逻辑
                    }
                })
                .catch((error) => {
                    message.error("There is a problem with the network");
                    console.log("There is a problem with the network", error);
                });
        };
        RejectApply(groupId, username);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const columns = [
        {
            title: "Owners",
            dataIndex: "username",
        },
        {
            title: "status",
            dataIndex: "message",
        },
        {
            title: "Current status",
            render: (e, record) => (
                <>
                    {contextHolder}
                    {record.status === "0" ? (
                        <Tag
                            color="warning"
                            icon={<ExclamationCircleOutlined />}
                            onChange={openNotification(record)}
                        >
                            Waiting for reply
                        </Tag>
                    ) : record.status === "1" ? (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                            Agreed
                        </Tag>
                    ) : (
                        <Tag color="error" icon={<CloseCircleOutlined />}>
                            Rejected
                        </Tag>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <div className="Paging3">
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={{
                        ...tableParams.pagination,
                        position: ["bottomRight"],
                    }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
};

export default Abouttable;
