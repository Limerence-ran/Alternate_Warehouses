import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// import React, { useEffect, useState, useRef } from "react";
// import { Table } from "antd";
// import { CaretRightOutlined } from "@ant-design/icons";
// import qs from "qs";
// import "./main.css";
// import style from "./main.module.css";
// import { useNavigate } from "react-router-dom";

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
    const datashow = () => {
        navigate("/Chartdata/Chart5");
    };
    const fetchData = () => {
        setLoading(true);
        const groupid = localStorage.getItem("myGroupid");
        const usedata = (groupid) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31130/resource/resource",
                    // 要上传的群组信息
                    {
                        id: groupid,
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

                    setData(
                        //data.data
                        [
                            {
                                "id": 5,
                                "resourceName": "2332",
                                "ownerId": 22,
                                "groupId": 9,
                                "popularity": 23,
                                "noiseLevel": 2,
                                "referenceQuantity": 121,
                                "type": "commercial",
                                "deleted": null,
                                "version": null,
                                "ownerName": "houtai",
                                "isRelative": 1
                            },
                            {
                                "id": 8,
                                "resourceName": "draw",
                                "ownerId": 21,
                                "groupId": 9,
                                "popularity": 0,
                                "noiseLevel": 3,
                                "referenceQuantity": 121,
                                "type": "academic",
                                "deleted": null,
                                "version": null,
                                "ownerName": "drawing",
                                "isRelative": 1
                            }
                        ]
                    );
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
                    } else {
                        // message.error(msg);
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
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
            title: "Owners",
            dataIndex: "owner",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "referenceQuantity",
            dataIndex: "referenceQuantity",
        },

        {
            title: "",
            render: (e, record) => (
                <button className={style.get2} onClick={datashow}>
                    {" "}
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
