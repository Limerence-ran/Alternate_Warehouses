import style from './main.module.css'
import img1 from '../../assets/images/2.jpg'
const Introduction = ()=>{
    return (
        <>
            <div className={style.Img}>
            {/* <img src={img1}/> */}
                <div className={style.Imgleft}>
                  <h3>软件自动升级检查</h3>
                  <h3>软件在线下载</h3>
                  <h3>本机软件管理</h3>
                  <h3>服务端数据库升级</h3>
               </div>
                <div className={style.Imgright}>
                    <div className={style.Imgtop}>
                     
                    </div>
                    <div className={style.Imgbuttom}>
                        
                    </div>
                </div>
        </div>
        </>
    )
}
export default Introduction
