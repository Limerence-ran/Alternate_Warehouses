import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import "./main.css";
import style from "./main.module.css";
import axios from "axios";
import { message, Button } from "antd";

const Pagetable1 = ({ handleAjaxChange }) => {
    const [data, setData] = useState([]);
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [disabledButtons, setDisabledButtons] = useState([]);
    const navigate = useNavigate();
    const idGroup = async (id) => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        setLoading(true);
        await axios
            .post(
                "http://39.98.41.126:31130/resource/page",
                // 要上传的群组信息
                {
                    id: id,
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
                    setData(data.data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 200,
                        },
                    });
                } else {
                    message.error("The connection failed: " + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                message.error("There is a problem with the network");
                console.log("There is a problem with the network", error);
            });
        await axios
            .post(
                "http://39.98.41.126:31130/resource/resource",
                // 要上传的群组信息
                {
                    id: id,
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
                    setMydata(data.data);
                    message.success("Request Granted" + msg);
                } else {
                    message.error(msg);
                }
            })
            .catch((error) => {
                message.error(" An error occurred in the request");
                console.log(error);
            });
    };

    useEffect(() => {
        let Groupid = localStorage.getItem("myGroupid");
        idGroup(Groupid);
    }, [JSON.stringify(tableParams)]);

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
    const onclickGet = (record) => {
        let objectId = record.ownerId;
        let id = localStorage.getItem("myGroupid");
        let recordId = record.id;
        const Getpost = (id, objectId, recordId) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31130/users/putApplication",
                    {
                        groupId: id + "",
                        objectId: objectId + "",
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
                        message.success("Request sent");
                        // 将被点击按钮的唯一标识添加到 disabledButtons 数组中
                        setDisabledButtons([...disabledButtons, recordId]);
                    } else {
                        message.error("The request failed: " + msg);
                    }
                })
                .catch((error) => {
                    message.error("There is a problem with the network");
                    console.log("There is a problem with the network", error);
                });
        };
        Getpost(id, objectId, recordId);
    };
    let columns = [
        {
            title: "ResourceName",
            dataIndex: "resourceName",
        },
        {
            title: "OwnerName",
            dataIndex: "ownerName",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "ReferenceQuantity",
            dataIndex: "referenceQuantity",
        },
        {
            title: "",
            render: (e, record) => {
                let useOrGet = mydata.some(
                    (obj) => obj.resourceName === record.resourceName
                );
                if (useOrGet) {
                    return (
                        <Button
                            className={style.getbtn}
                            onClick={() => onclickGet(record)}
                            disabled={disabledButtons.includes(record.id)} // 判断按钮是否被禁用
                        >
                            Get
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            className={style.getbtn2}
                            onClick={() => {
                                //判断有无上传数据
                                const ajax = async () => {
                                    try {
                                        // 发送请求
                                        const response = await axios({
                                            url: "http://39.98.41.126:31130/resource/resource",
                                            method: "PUT",
                                            headers: {
                                                Authorization:
                                                    localStorage.getItem(
                                                        "token"
                                                    ), // 替换为你的实际授权头部
                                            },
                                            data: {
                                                id: localStorage.getItem(
                                                    "myGroupid"
                                                ),
                                            },
                                        });
                                        // 处理成功状态
                                        const { code, msg } = response.data;
                                        if (code === 1) {
                                            message.success(
                                                "Data request successful"
                                            );
                                            navigate("/Chartdata/Chart5");
                                        } else {
                                            message.error(msg);
                                            navigate(
                                                "/Chartdata/Chart4/UploadMyData"
                                            );
                                        }
                                    } catch (error) {
                                        // 处理错误状态
                                        message.error(
                                            "The request failed. Please check your network connection"
                                        );
                                        throw error; // 可以选择抛出错误，供调用者处理
                                    }
                                };
                                ajax();
                            }}
                        >
                            Use
                        </Button>
                    );
                }
            },
        },
    ];

    return (
        <>
            <div className="Paging2">
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

export default Pagetable1;
