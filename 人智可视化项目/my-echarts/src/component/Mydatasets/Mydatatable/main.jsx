import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import qs from 'qs';
import "./main.css"
import style from './main.module.css'
import { useNavigate } from 'react-router-dom';



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
  const datashow =()=>{
          navigate('/Chart1');
    
  }
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



    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const columns = [
        {
            title: 'dataset Name',
            dataIndex: 'email',
        },
        {
            title: 'Owners',
            dataIndex: 'email',
        },
        {
            title: 'Data Attributes',
            dataIndex: 'email',
        },
        {
            title: 'Number of Users',
            dataIndex: 'email',
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