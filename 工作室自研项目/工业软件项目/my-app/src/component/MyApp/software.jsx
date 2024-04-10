import { UserOutlined, UploadOutlined, ManOutlined } from '@ant-design/icons'
import style from './main.module.css'
import './software.css'
import img from '../../assets/login-back.jpg'
import { useState ,useEffect} from 'react'
import datas from './data'
import { message } from "antd";
import axios from "axios";


const Software = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [software, setSoftware] = useState([1,2,3])

    const handleOpenWindow = () => {
        
        setIsOpen(true);
    };

    const handleCloseWindow = () => {
        setIsOpen(false);
    };

  useEffect(()=>{
      const fetchData = () => {
          const token = localStorage.getItem("token"); // 从本地存储中获取授权 token

          axios
              .get(
                  `http://39.98.41.126:31135/users/showAllPurchases`,
                  {
                      headers: {
                          Authorization:token, // 使用授权的 token
                          "Content-Type": "application/json",
                      },
                  }
              )
              .then((response) => {
                  const { code, msg, data } = response;
                  console.log(data.data)
                  setSoftware(data.data)
                  if (code === 1000) {
                      // 身份认证过期
                      message.error(msg);
                  } else if (code === 1001) {
                      // 查询成功
                      message.success(msg);
                      console.log("数据:", data);
                  } else {
                      // 其他错误
                      message.error("查询失败: " + msg);
                  }
              })
              .catch((error) => {
                  message.error("请求出错");
                  console.log("请求出错", error);
              });
      };

      // 使用示例
      fetchData();

  },[])
    return (
        <>
        {software.map((item)=>(
                <div className={style.software}>
                    <div className={style.app}>
                        <div className={style.appleft}>
                            <div> <img src={img} className={style.img} /></div>
                            <div className={style.text}>
                                <h2>{item.name}</h2>
                                <span>记录美好生活</span>
                                <h4><a href='javascript:void(0);' onClick={() => handleOpenWindow(item.id)}> <UploadOutlined />下载</a></h4>
                            </div>

                        </div>
                        <div className={style.appright}>
                            <div className={style.timer}>
                                <h4>授权时间：{item.start}</h4>
                                <h4>过期时间：{item.expire}</h4>
                            </div>
                            <div className={style.btn}>
                                <button>
                                    <select>
                                        <option>续费</option>
                                        <option>续费一年</option>
                                        <option>续费两年</option>
                                    </select>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
        )) 
        }         
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