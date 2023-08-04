import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import qs from 'qs';
import "./main.css"
import style from './main.module.css'
import { useNavigate } from 'react-router-dom';
import Cancel from '../../Cancel/main'
import axios from "axios";
import { message } from "antd";
import { Button, Space } from 'antd';


const HotTable = () => {
    const [data, setData] = useState();
    const [detail, setDatail] = useState('')
    const [loading, setLoading] = useState(false);
    const [iscancel, setIscancel] = useState(false);
    const [disable, setDisable] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const Cancelbox = (e) => {
        setDatail(e)
        console.log(e)
        setIscancel(!iscancel);
    }
    const navigate = useNavigate();
    const OnclickName = () => {
        navigate('/Chartdata/Chart4');
    }
    const fetchData = () => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        fetch(`http://39.98.41.126:31130/groups/page`, { headers })
            // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`, { headers })
            .then((res) => res.json())

            .then(res => {
                let results = res.data.data
                console.log(res.data.data)
                setData(results);
                let newArr = Array(10000).fill(false)
                setDisable(newArr)
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                      
                    },
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


        // setDisable(!newArr[record.id])
        console.log("record:", record)
        console.log("record:", record.groupName)
        const name = record.groupName
        let arr = [...disable]
        arr[record.id] = true
        setDisable(arr)
       




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
                    const { code, msg, data } = response;
                    console.log(response)
                    if (code === 1000) {
                        message.error("加入失败: " + msg);

                    } else {
                        console.log("data:" + data)
                        // 在这里处理成功的逻辑
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
                });
        };
        joinGroup(name);
    };









    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
        },
        {
            title: 'Group Type',
            dataIndex: 'popularity',
        },
        {
            title: 'dimensions',
            dataIndex: 'dimension',
        },
        {
            title: 'group datasets',
            dataIndex: 'resourceQuantity',
        },
        {
            title: 'Withdrawal',
            render: (e, record) => (
                <Button disabled={disable[record.id]} onClick={() => handleDelete(record)} className={style.withdrawal} > Join</Button >
            )
        },
    ];

    return (
        <><div className='Paging' >
            <Table
                columns={columns}
                // rowKey={(record) => record.login.uuid}
                dataSource={data}
                pagination={{
                    ...tableParams.pagination,
                    position: ['bottomRight'],
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
            {
                iscancel && <Cancel className={style.cancelContainer} value={detail} />
            }
        </>
    );
};
export default HotTable;


