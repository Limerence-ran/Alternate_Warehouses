import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Mydatatable = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const navigate = useNavigate();
    const fetchData = () => {
        setLoading(true);
        const groupid = localStorage.getItem("myGroupid");
        const usedata = (groupid) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31801/resource/resource",
                    // 要上传的群组信息
                    {
                        id: parseInt(groupid),
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
                        message.success("Request Granted");
                        setData(data.data);
                    } else if (code === 4003) {
                        message.warning("No data available");
                    } else {
                        message.error(msg);
                    }
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 200,
                        },
                    });
                })
                .catch((error) => {
                    message.error("An error occurred in the request");
                    console.log(error);
                });
        };
        usedata(groupid);
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const columns = [
        {
            title: "Dataname",
            dataIndex: "resourceName",
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
            render: (e, record) => (
                <button
                    className={style.get2}
                    onClick={() => {
                        //判断有无上传数据
                        const ajax = async () => {
                            try {
                                // 发送请求
                                const response = await axios({
                                    url: "http://39.98.41.126:31801/resource/resource",
                                    method: "PUT",
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("token"), // 替换为你的实际授权头部
                                    },
                                    data: {
                                        id: localStorage.getItem("myGroupid"),
                                    },
                                });
                                // 处理成功状态
                                const { code, msg } = response.data;
                                if (code === 1) {
                                    message.success("Data request successful");
                                    navigate("/Chartdata/Chart5");
                                } else {
                                    message.error(msg);
                                    navigate("/Chartdata/Chart4/UploadMyData");
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
                </button>
            ),
        },
    ];

    return (
        <>
            <div className="Paging1">
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

export default Mydatatable;
