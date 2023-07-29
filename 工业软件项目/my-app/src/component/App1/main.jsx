
import style from './main.module.css'
import Software from '../MyApp/software'
import img from '../../assets/login-back.jpg'
import Page from '../Paging/main'
import './main.css'

const App1 = () => {
    return (
        <>
            <div className={style.title}>
                <div className={style.titlebox}>
                     <img src={img} />
                     <div><h3>软件名称</h3></div>
                    <button className={style.deletebtn}>删除该软件</button>
                     </div>
            </div>
           <div className={style.App1}>
                <Page/>
           </div>
        </>

    )
}
export default App1