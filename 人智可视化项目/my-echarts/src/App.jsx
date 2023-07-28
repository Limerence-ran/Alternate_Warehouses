import React, { useState } from 'react'
import style from './App.module.css'
import GroupPage from './page/GroupPage/main'
import Company from './component/Company/main'
import Chartdata from './page/Chartdata/main'
import Chartdata2 from './page/Chartdata2/main'
import CancelPage from './page/CancelPage/main'
import Slider from './component/Slider/main'
import Page from './component/Paging/main'
import Chart2 from './component/Chart2/main'
import UploadForm from './component/Upload/main'
import UploadPage from '../src/page/UploadPage/main'




function App() {

  return (
    <>
      {/* <GroupPage />  */}
      {/* <Chartdata/>  */}
      {/* <Chartdata2/>  */}
      {/* <CancelPage/> */}
      {/* <UploadForm /> */}
      <UploadPage/>
    </>
  )
}

export default App


// import React, { useEffect, useState } from 'react';
// import { Table } from 'antd';
// import qs from 'qs';
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     sorter: true,
//     render: (name) => `${name.first} ${name.last}`,
//     width: '20%',
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       {
//         text: 'Male',
//         value: 'male',
//       },
//       {
//         text: 'Female',
//         value: 'female',
//       },
//     ],
//     width: '20%',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//   },
// ];
// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageize,
//   page: params.pagination?.current,
//   ...params,
// });
// const App = () => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [tableParams, setTableParams] = useState({
//     pagination: {
//       current: 1,
//       pageize: 10,
//     },
//   });
//   const fetchData = () => {
//     setLoading(true);
//     fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//       .then((res) => res.json())
//       .then(({ results }) => {
//         setData(results);
//         setLoading(false);
//         setTableParams({
//           ...tableParams,
//           pagination: {
//             ...tableParams.pagination,
//             total: 200,
//             // 200 is mock data, you should read it from server
//             // total: data.totalCount,
//           },
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [JSON.stringify(tableParams)]);
//   const handleTableChange = (pagination, filters, sorter) => {
//     setTableParams({
//       pagination,
//       filters,
//       ...sorter,
//     });

//     // `dataSource` is useless since `pageize` changed
//     if (pagination.pageize !== tableParams.pagination?.pageize) {
//       setData([]);
//     }
//   };
//   return (
//     <Table
//       columns={columns}
//       rowKey={(record) => record.login.uuid}
//       dataSource={data}
//       pagination={tableParams.pagination}
//       loading={loading}
//       onChange={handleTableChange}
//     />
//   );
// };
// export default App;