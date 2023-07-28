import { UserOutlined, UploadOutlined, ManOutlined } from '@ant-design/icons'
import style from './main.module.css'
import img from '../../assets/images/3.jpg'
const Software = ()=>{
    return (
        <>
            <div className={style.software}>
                <div className={style.app}>
                    <div className={style.appleft}>
                        <div> <img src={img} className={style.img} /></div>
                        <div className={style.text}>
                            <h3>抖音</h3>
                            <span>记录美好生活</span>
                            <h4><a href='#'> <UploadOutlined />下载</a></h4>
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
                            < button className={style.btnright}>
                                更新
                            </ button>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default Software