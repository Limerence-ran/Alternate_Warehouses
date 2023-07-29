
import img from '../../assets/login-back.jpg'
import style from './main.module.css'
const UploadedApp = () => {

    return (
        <>
            <div className={style.software1}>
                <div className={style.app}>
                    <div className={style.appBox}>
                        <div> <img src={img} className={style.img1} /></div>
                        <div className={style.text}>
                            <h1>抖音</h1>
                            <h4>记录美好生活</h4>
                        </div>

                    </div>
                    {/* <div className={style.appright}>
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
                    </div> */}

                </div>
            </div>
            </>
    )
}

export default UploadedApp