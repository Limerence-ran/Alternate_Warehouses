import React, { useState, useEffect } from 'react';
import { Table, Divider } from 'antd';
import './main.css'
import Calender from '../日历/main';
const columns = [
    {
        title: '车牌号',
        dataIndex: 'rank',
    },
    {
        title: '日期',
        dataIndex: 'rank',
    },
    {
        title: '异常情况',
        dataIndex: 'infor',
    },
];
const data = [
    {

        rank: 1,
        infor: 'New No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New  No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New  No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New  No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New York No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },
    {

        rank: 1,
        infor: 'New York No. 1 Lake Park',
    },
    {

        rank: 2,
        infor: 'London No. 1 Lake Park',
    },
    {

        rank: 3,
        infor: 'Sydney No. 1 Lake Park',
    },


];
const WrongCap = () => {
    const [pageSize, setPageSize] = useState(18); // 使用 useState 设置每页展示的行数

    useEffect(() => {
        setPageSize(10);
    }, []); // 初始加载时设置每页展示的行数为10

    const handlePaginationChange = (pagination) => {
        setPageSize(pagination.pageSize); // 更新每页展示的行数
    };
    return (
        <>


            <div className='Table' style={{ width: '100%', height: '97%', margin: "2% 0% 2% 0%" }}>
                <Table columns={columns} className='Table' bordered={false}  dataSource={data} size="small" rowSelection={null} pagination={{ defaultPageSize: pageSize, onShowSizeChange: handlePaginationChange }} />
            </div>
        </>
    )

};
export default WrongCap;