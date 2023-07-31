import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import qs from 'qs';
import "./main.css"
import style from './main.module.css'
import { useNavigate } from 'react-router-dom';
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
    const datashow = () => {
        navigate('/Chartdata/Chart5');

    }
    const fetchData = () => {
        setLoading(true);
        const groupid = localStorage.getItem('myGroupid')
        const usedata = (groupid) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .post(
                    "http://39.98.41.126:31130/resource/resource",
                    // 要上传的群组信息
                    {
                        id: groupid
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
                    setData(response.data.data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 200,
                        },
                    });
                    if (code === 0) {
                        message.success(msg);
                        console.log("data:" + data);
                    } else {
                        message.error("创建失败: " + msg);
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
                });
        };
    usedata(groupid);
    }

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
            title: 'resourceName',
            dataIndex: 'data.data.resourceName',
        },
        {
            title: 'Owners',
            dataIndex: 'data.data.owner',
        },
        {
            title: 'Type',
            dataIndex: 'data.data.type',
        },
        {
            title: 'referenceQuantity',
            dataIndex: 'data.data.referenceQuantity',
        },
       

        {
            title: '',
            render: (e, record) => (
                <button className={style.get2} onClick={datashow}> Use</button >
            )
        },
    ];

    return (
        <><div className='Paging1' >
            <Table
                columns={columns}
                rowKey={(record) => record.login.uuid}
                dataSource={data}
                pagination={{
                    ...tableParams.pagination,
                    position: ['bottomRight'],
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
        </>
    );
};



export default Mydatatable;