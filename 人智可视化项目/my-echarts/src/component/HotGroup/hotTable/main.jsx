import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import Cancel from "../../Cancel/main";
import axios from "axios";
import { message } from "antd";
import { Button, Space } from "antd";

const HotTable = () => {
    const [data, setData] = useState();
    const [detail, setDatail] = useState("");
    const [loading, setLoading] = useState(false);
    const [iscancel, setIscancel] = useState(false);
    const [disable, setDisable] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const fetchData = async () => {
        let dataset = [];
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        await fetch(`http://39.98.41.126:31130/groups/page`, { headers })
            .then((res) => res.json())
            .then((res) => {
                res.data.data.forEach((i) => {
                    i.join = false;
                });
                dataset = res.data.data;
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
            })
            .then(() => {
                fetch(`http://39.98.41.126:31130/groups`, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(i);
                        dataset.forEach((i) => {
                            res.data.forEach((j) => {
                                if (i.id === j.id) {
                                    i.join = true;
                                }
                            });
                        });
                        setData(dataset);
                        setLoading(false);
                    });
            });
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

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleDelete = (record) => {
        const name = record.groupName;
        let arr = [...data];
        arr.forEach((object) => {
            if (object.id === record.id) {
                object.join = true;
            }
        });
        setData(arr);
        const joinGroup = (groupName) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31130/groups/join",
                    {
                        groupName: groupName,
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
                    console.log(response);
                    if (code === 1) {
                        message.success("Join successfully: " + msg);
                    } else {
                        message.error("Join failed: " + msg);
                        // 在这里处理成功的逻辑
                    }
                })
                .catch((error) => {
                    message.error("The request failed");
                    console.log("The request failed", error);
                });
        };
        joinGroup(name);
    };

    const columns = [
        {
            title: "Group Name",
            dataIndex: "groupName",
        },
        {
            title: "Group Popularity",
            dataIndex: "popularity",
        },
        {
            title: "Dimensions",
            dataIndex: "dimension",
        },
        {
            title: "Group Datanum",
            dataIndex: "resourceQuantity",
        },
        {
            title: "Withdrawal",
            render: (e, record) => {
                console.log(record.join);
                return (
                    <Button
                        disabled={record.join}
                        onClick={() => handleDelete(record)}
                        className={style.withdrawal}
                    >
                        Join
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <div className="Paging">
                <Table
                    columns={columns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={{
                        ...tableParams.pagination,
                        position: ["bottomRight"],
                    }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
            {iscancel && (
                <Cancel className={style.cancelContainer} value={detail} />
            )}
        </>
    );
};
export default HotTable;
