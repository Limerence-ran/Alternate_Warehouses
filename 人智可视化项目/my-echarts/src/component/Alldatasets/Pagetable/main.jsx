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
                // 查询群组中的所有资源
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
                // 获取响应数据
                const { code, msg, data } = response.data;
                // 如果响应码为 1，则表示成功
                if (code === 1) {
                    // 如果成功，则将数据设置到 data 中
                    setData(data.data);
                    // 关闭 loading 标志
                    setLoading(false);
                    // 设置表格参数
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 200,
                        },
                    });
                } else {
                    // 如果失败，则在这里处理其他错误情况的逻辑
                    message.error("The connection failed: " + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                // 如果出现错误，则在这里处理其他错误情况的逻辑
                message.error("There is a problem with the network");
                axios
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
                            // 如果成功，则将数据设置到 mydata 中
                            setMydata(data.data);
                            // 成功授权，则提示用户
                            message.success("Request Granted" + msg);
                        } else {
                            // 如果失败，则在这里处理其他错误情况的逻辑
                            message.error(msg);
                        }
                    })
                    .catch((error) => {
                        // 如果出现错误，则在这里处理其他错误情况的逻辑
                        message.error(" An error occurred in the request");
                        console.log(error);
                    });
            });
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
            title: "Dataname",
            dataIndex: "dataname",
        },
        {
            title: "OwnerName",
            dataIndex: "ownerName",
        },
        {
            title: "NoiseLevel",
            dataIndex: "noiseLevel",
        },
        {
            title: "DataScore",
            dataIndex: "popularity",
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
