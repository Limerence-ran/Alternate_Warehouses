// import './main.module.css'
// import React, { useState } from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// const items = [
//     {
//         label: 'Navigation One',
//         key: 'mail',
//         icon: <MailOutlined />,
//     },
//     {
//         label: 'Navigation Two',
//         key: 'app',
//         icon: <AppstoreOutlined />,
//         disabled: true,
//     },
//     {
//         label: 'Navigation Three - Submenu',
//         key: 'SubMenu',
//         icon: <SettingOutlined />,
//         children: [
//             {
//                 type: 'group',
//                 label: 'Item 1',
//                 children: [
//                     {
//                         label: 'Option 1',
//                         key: 'setting:1',
//                     },
//                     {
//                         label: 'Option 2',
//                         key: 'setting:2',
//                     },
//                 ],
//             },
//             {
//                 type: 'group',
//                 label: 'Item 2',
//                 children: [
//                     {
//                         label: 'Option 3',
//                         key: 'setting:3',
//                     },
//                     {
//                         label: 'Option 4',
//                         key: 'setting:4',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: (
//             <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//                 Navigation Four - Link
//             </a>
//         ),
//         key: 'alipay',
//     },
// ];
// const Header = () => {
//     const [current, setCurrent] = useState('mail');
//     const onClick = (e) => {
//         console.log('click ', e);
//         setCurrent(e.key);
//     };
//     return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
// };
// export default Header;

import style from './main.module.css'
import img3 from '../../assets/images/3.jpg'
import { AlertOutlined, CommentOutlined,UserOutlined} from '@ant-design/icons'
const  Header = () => {
    return (
        <>
        <div className={style.header}>
                  <div className={style.brand}>
                    <img src={img3} alt='' />
                    <h3>QG软件升级助手</h3>
                  </div>
                  
                    <form action="#">
                        <div className={style.formGroup}>
                            <input type="text" placeholder="Search..."/>
                        <AlertOutlined className={style.icon}/>
                        </div>
                    </form>
                    <a href="#">
                    <CommentOutlined />
                        <span class="badge">更新</span>
                    </a>
                    <a href="#" >
                    <UserOutlined />
                    </a>
                   
        </div>
        </>
    )
}
export default Header;