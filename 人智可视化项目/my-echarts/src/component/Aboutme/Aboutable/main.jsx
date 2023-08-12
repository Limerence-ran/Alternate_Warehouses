import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import { message } from "antd";
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
                const { code, msg, data } = response;
                console.log(response);
                setData(response.data.data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
                if (code === 1) {
                    // 查询成功
                    message.success(msg);
                    console.log("数据:", data);
                } else {
                    // 其他错误
                    message.error("查询失败: " + msg);
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
      
    };

    useEffect(() => {
        //    const myid= localStorage.getItem('myGroupid')
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
                        operate: 1,
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
                        operate: 2,
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

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

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
                    {record.status === "0" ? (
                        <span className={style.wait}>Waiting for reply</span>
                    ) : record.status === "1" ? (
                        <Button className={style.get}> Agreed</Button>
                    ) : record.status === "2" ? (
                        <Button className={style.get}> Rejected</Button>
                    ) : (
                        <>
                            {" "}
                            <Button
                                className={style.get}
                                onClick={() => Agree(record)}
                            >
                                {" "}
                                Agreed
                            </Button>
                            <Button
                                className={style.get}
                                onClick={() => Rejected(record)}
                            >
                                {" "}
                                Rejected
                            </Button>
                        </>
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

// import { message } from "antd";
// import axios from "axios";
// const Applymessage = () => {
//     const token = localStorage.getItem("token"); // 从本地存储获取 token
//     axios
//         .get(
//             `http://39.98.41.126:31130/users/readMessages`,
//             {
//                 headers: {
//                     Authorization: token, // 使用从本地存储中获取的 token
//                     "Content-Type": "application/json",
//                 },
//             }
//         )
//         .then((response) => {
//             const { code, msg, data } = response;

//             if (code === 1) {
//                 // 查询成功
//                 message.success(msg);
//                 console.log("数据:", data);
//             } else {
//                 // 其他错误
//                 message.error("查询失败: " + msg);
//             }
//         })
//         .catch((error) => {
//             message.error("请求出错");
//             console.log("请求出错", error);
//         });
// };

// // 使用示例
// Applymessage();
