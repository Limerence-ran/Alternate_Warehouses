
import style from './main.module.css'
import Software from '../MyApp/software'
import UploadedApp from '../../component/UploadApp/uploadedApp'

const UploadApp = () => {
    return (
        <>
            <div className={style.title}>
                <span>已下载的软件</span>
            </div>
            <UploadedApp/>
          
        </>

    )
}
export default UploadApp 