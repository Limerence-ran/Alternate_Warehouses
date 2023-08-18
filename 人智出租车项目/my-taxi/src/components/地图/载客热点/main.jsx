import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";
import style from "./main.module.css";
import SwitchButton from "../../开关/main";

const columns = [
    {
        title: "载客热点",
        dataIndex: "infor",
    },
];
const data = [
    {
        infor: "New No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "New  No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        rank: 1,
        infor: "New No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "New  No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "New  No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "New York No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
    {
        infor: "New York No. 1 Lake Park",
    },
    {
        infor: "London No. 1 Lake Park",
    },
    {
        infor: "Sydney No. 1 Lake Park",
    },
];
const Hot = () => {
    const [pageSize, setPageSize] = useState(15); // 使用 useState 设置每页展示的行数
    // 按钮开关
    const [btnOpen, setBtnOpen] = useState(false);
    useEffect(() => {
        setPageSize(10);
    }, []); // 初始加载时设置每页展示的行数为10

    const handlePaginationChange = (pagination) => {
        setPageSize(pagination.pageSize); // 更新每页展示的行数
    };
    return (
        <>
            <div
                className={style.hot}
                style={{
                    width: "99%",
                    height: "12%",
                    margin: "0% 0% 0% 0%",
                    color: "#fff",
                }}
            >
                <div>
                    <span>显示载客热点</span>
                    <SwitchButton className={style.hot_btn} />
                </div>
                <div>
                    <span>显示流向图</span>
                    <SwitchButton className={style.hot_btn} />
                </div>
            </div>

            <div
                className="Table"
                style={{ width: "99%", height: "85%", margin: "3% 0% 2% 0.5%" }}
            >
                <Table
                    columns={columns}
                    className="Table"
                    bordered={false}
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
export default Hot;
