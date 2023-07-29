import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import qs from 'qs';
import  "./main.css"
import style from './main.module.css'


const Page = () => {
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
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
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
        const updatedData = data.filter((item) => item.login.uuid !== record.login.uuid);
        setData(updatedData);
    };


    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'email',
        },
        {
            title: 'Group Type',
            dataIndex: 'email',
        },
        {
            title: 'Group Purpose',
            dataIndex: 'email',
        },
        {
            title: 'dimensions',
            dataIndex: 'email',
        },
        {
            title: 'Email',
            render: () => <CaretRightOutlined />,
        },
        {
            title: 'Withdrawal',
            render: (e, record) => (
                <button onClick={() => handleDelete(record)} className={style.withdrawal} > Withdrawal</button >
            )
        },
    ];

    return (
        <><div className='Paging'>
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

export default Page;