
import style from './main.module.css'
import Software from './software'

const MyApp = () => {
    return (
        <>
            <div className={style.title}>
                <span>已购买的软件</span>
            </div>
            <Software />
            
        </>

    )
}
export default MyApp