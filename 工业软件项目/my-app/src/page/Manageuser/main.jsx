



import React, { useState } from 'react';
import style from './main.module.css';
import img from '../../assets/user.png';
import SwitchButton from '../../component/UserInfor/btn/';
import users from './userdata/userdata';
import HomeHead from '../../components/home-head/main';


function Manageuser() {
    const usersPerPage = 8; // 每页显示的用户数量
    const totalUsers = users.length; // 总用户数
    const totalPages = Math.ceil(totalUsers / usersPerPage); // 总页数

    const [currentPage, setCurrentPage] = useState(1); // 当前所在的页码

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const displayedUsers = users.slice(startIndex, endIndex); // 假设 users 是用户数据数组

    return (
        <>
            <HomeHead/>
            <div className={style.managebox}>
                <div className={style.users}>
                    <div className={style.usertitle}>
                        <h3>你可以管理以下用户</h3>
                    </div>
                    <div className={style.lists}>
                        <table className={style.table}>
                            <tbody>
                                {displayedUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={img} alt="User" />
                                            {/* <UserOutlined className={style.userimg}/> */}
                                        </td>
                                        <td>用户ID: {user.id}</td>
                                        <td>用户状态: {user.status}</td>
                                        <td>
                                            <label className={style.labeltext}>是否封禁用户:</label>
                                            <SwitchButton className={style.userbtn} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.pagination}>
                        <button onClick={goToPreviousPage} className={style.pagebtn}>上一页</button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => goToPage(index + 1)}
                                className={currentPage === index + 1 ? style.active : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={goToNextPage} className={style.pagebtn}>下一页</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manageuser;