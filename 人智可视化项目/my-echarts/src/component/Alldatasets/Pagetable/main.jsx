import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import axios from "axios";
import { message } from "antd";

const Pagetable1 = ({ handleAjaxChange }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const idGroup = (id) => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        setLoading(true);
        axios
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
                const { code, msg, data } = response;
                console.log(response);
                setData(response.data.data);

    
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
                if (code === 1) {
                    message.success(msg);
                    console.log("data:" + data);
                } else {
                    message.error("连接失败: " + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    };

    useEffect(() => {
        // fetchData();
        let Groupid = localStorage.getItem("myGroupid");
        console.log(Groupid);
        idGroup(Groupid);

        // fetchData();
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
        console.log("owner", record);
        let objectId = record.ownerId;
        let id = localStorage.getItem("myGroupid");

        const Getpost = (id, objectId) => {
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
                    const { code, msg, data } = response;

                    if (code === 1) {
                        console.log("data:" + data);
                        // 在这里处理成功的逻辑
                    } else {
                        message.error("创建失败: " + msg);
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
                });
        };

        Getpost(id, objectId);
    };

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const columns = [
        {
            title: "resourceName",
            dataIndex: "resourceName",
        },
        {
            title: "ownerName",
            dataIndex: "ownerName",
        },
        {
            title: "type",
            dataIndex: "type",
        },
        {
            title: "referenceQuantity",
            dataIndex: "referenceQuantity",
        },

        {
            title: "",
            render: (e, record) => (
                <button className={style.getbtn} onClick={()=>onclickGet(record)}> Get</button >
            )
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

export default Pagetable1;
