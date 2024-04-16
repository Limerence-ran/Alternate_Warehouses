import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";
import "./main.css";
import Calender from "../calendar/main";
const columns = [
    {
        title: "Rank",
        dataIndex: "rank",
    },
    {
        title: "Taxi",
        dataIndex: "infor",
    },
];
const data = [
    {
        rank: 1,
        infor: "New No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New  No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New  No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New  No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New York No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New York No. 1 Lake Park",
    },
    {
        rank: 2,
        infor: "London No. 1 Lake Park",
    },
    {
        rank: 3,
        infor: "Sydney No. 1 Lake Park",
    },
];
const Prank = () => {
    const [pageSize, setPageSize] = useState(8); // 使用 useState 设置每页展示的行数

    useEffect(() => {
        setPageSize(10);
    }, []); // 初始加载时设置每页展示的行数为10

    const handlePaginationChange = (pagination) => {
        setPageSize(pagination.pageSize); // 更新每页展示的行数
    };
    return (
        <>
            <div className="pageHeader">
                {/* < Calender/> */}
                <h3
                    style={{
                        color: "#fff",
                        width: "100%",
                        paddingTop: "5%",
                        fontSize: "23px",
                        fontFamily: "cursive"
                    }}
                >
                    出租车流量排行榜
                </h3>
            </div>
            <div className="Table">
                <Table
                    columns={columns}
                    className="Table"
                    showHeader={false}
                    dataSource={data}
                    size="small"
                    rowSelection={null}
                    pagination={{
                        defaultPageSize: pageSize,
                        onShowSizeChange: handlePaginationChange,
                    }}
                />
            </div>
        </>
    );
};
export default Prank;
