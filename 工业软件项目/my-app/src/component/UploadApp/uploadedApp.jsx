
import img from '../../assets/login-back.jpg'
import style from './main.module.css'
import { useEffect ,useState} from 'react'
import axios from "axios";
import { message } from "antd";



const UploadedApp = () => {
   const [upload,setUpload] = useState([])
    useEffect(()=>{
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        axios
            .get("http://39.98.41.126:31135/users/selectAll", {
                headers: {
                    Authorization: token, // 使用从本地存储中获取的 token
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const { code, data, msg } = response.data;
            //    console.log(data.data)
            // console.log(data)
                setUpload(data)
                if (code === 1000) {
                    // 请求格式错误
                    message.error(msg);
                    // 在这里处理请求格式错误的逻辑
                } else if (code === 1002) {
                    // 服务器异常或繁忙
                    message.error(msg);
                    // 在这里处理服务器异常或繁忙的逻辑
                } else if (code === 1001) {
                    // 查看已下载函数成功
                    message.success(msg);
                    // 在这里处理查看已下载函数成功的逻辑
                    // console.log(upload);
                } else {
                    // 其他错误
                    message.error("未知错误: " + msg);
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                console.log("请求出错", error);
                // 在这里处理请求出错的逻辑
                message.error("请求出错: " + error.message);
            });
    

    },[])

    function updateApp(id){
        console.log(id)
        const token =localStorage.getItem("token")
        axios.get(`http://39.98.41.126:31135/download/6`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            responseType: 'arraybuffer' // 设置响应类型为 arraybuffer
        })
            .then((response) => {
                const data = response.data; // 获取字节格式数据

                const blob = new Blob([data]); // 创建 Blob 对象
                const url = URL.createObjectURL(blob); // 创建 URL 对象

                const link = document.createElement('a'); // 创建 <a> 元素
                link.href = url; // 设置下载链接
                link.download = 'filename.extension'; // 设置下载文件的名称和扩展名

                document.body.appendChild(link); // 将 <a> 元素添加到文档中
                link.click(); // 模拟点击 <a> 元素进行下载

                document.body.removeChild(link); // 下载完成后，移除 <a> 元素
                URL.revokeObjectURL(url); // 释放 URL 对象的资源

                console.log(data); // 打印字节格式数据
            })
            .catch((error) => {
                console.log("请求出错", error);
                message.error("请求出错");
                // 执行请求出错后的逻辑处理
            });
        };


    return (
        <>
        {   upload.map((item)=>(
                    <div className={style.software1}>
                        <div className={style.app}>
                            <div className={style.appBox}>
                                <div> <img src={img} className={style.img1} /></div>
                                <div className={style.text}>
                                    <h1>{item.name}</h1>
                                    <h4>记录美好生活</h4>
                                </div>
                                <button className={style.updatebtn} onClick={() => updateApp(item.id)}>更新</button>
                            </div>

                        </div>
                    </div>
 
                ))
        }
            
            </>
    )
}

export default UploadedApp