import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";
import style from "./main.module.css";
import "./main.css";
import { useSelector } from 'react-redux' //用于从Redux状态树中选择需要的数据。
import { useDispatch } from 'react-redux'   //用于触发Redux中定义的actions。
import { btnChange } from "../../../slice/sliceCounter";  //导入actions


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
    const [pageSize, setPageSize] = useState(10); // 使用 useState 设置每页展示的行数
    const btnopen = useSelector((state) => { return state.counter.btnopen })
   
    const disPatch = useDispatch();

   
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
                    width: "100%",
                    height: "15%",
                    color: "#fff",
                }}
            >
                <div>
                    <span>显示载客热点</span>
                    <div className={style.hot_btn}>
                        <label className={`switch ${!btnopen ? "on" : "off"}`} >
                            <input
                                type="checkbox"
                                checked={btnopen}
                                onChange={() => {
                                    disPatch(btnChange())
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                  
                </div>
                <div>
                    <span>显示流向图</span>
                    <div className={style.hot_btn}>
                        <label className={`switch ${btnopen ? "on" : "off"}`} >
                            <input
                                type="checkbox"
                                checked={btnopen}
                                onChange={() => {
                                    disPatch(btnChange())
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
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
