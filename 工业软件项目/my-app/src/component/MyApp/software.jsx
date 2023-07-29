import { UserOutlined, UploadOutlined, ManOutlined } from '@ant-design/icons'
import style from './main.module.css'
import './software.css'
import img from '../../assets/login-back.jpg'
import { useState } from 'react'
import datas from './data'
const Software = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenWindow = () => {
        setIsOpen(true);
    };

    const handleCloseWindow = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div className={style.software}>
                <div className={style.app}>
                    <div className={style.appleft}>
                        <div> <img src={img} className={style.img} /></div>
                        <div className={style.text}>
                            <h2>抖音</h2>
                            <span>记录美好生活</span>
                            <h4><a href='javascript:void(0);' onClick={handleOpenWindow}> <UploadOutlined />下载</a></h4>
                        </div>

                    </div>
                    <div className={style.appright}>
                        <div className={style.timer}>
                            <h4>授权时间：</h4>
                            <h4>过期时间：</h4>
                        </div>
                        <div className={style.btn}>
                            <button>
                                <select>
                                    <option>续费</option>
                                    <option>续费一年</option>
                                    <option>续费两年</option>
                                </select>
                            </button>
                            {/* < button className={style.btnright}>
                                更新
                            </ button> */}
                        </div>
                    </div>

                </div>
            </div>   
                      
            {isOpen && (
                <div className="transparent-window">
                    <div className="header">
                        <img src={img} alt="软件图片" />
                        <h1>软件名称</h1>
                    </div>
                    <div className='history'>
                        <table>
                            <thead>
                                <tr>
                                    <th>版本号</th>
                                    <th>版本介绍</th>
                                    <th>发布时间</th>
                                    <th>下载地址</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => (

                                    <tr key={index}>
                                        <td>{data.id}</td>
                                        <td>{data.text}</td>
                                        <td>{data.time}</td>
                                        <td><a href={data.address}>下载</a></td>
                                    </tr>
                                ))}   
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleCloseWindow}>关闭窗口</button>
                </div>
            )}
        </>

    )
}
export default Software