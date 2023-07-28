
import style from './main.module.css'
import Slider from '../../component/Slider/main'
function Chartdata() {

    const renderLis = (lis) => {
        // console.log(lis)
    }
    return (
        <>
            <div className={style.Chartbox}>
                <Slider onLiElements={renderLis} />
                <div className={style.content}>
                    <div className={style.header}>
                    <span>asdcasfdsgvf</span>
                    </div>
                    <main>
                            <div className={style.chartbox} >
                                    <div className={style.chart}>
                                    </div>
                                    <div className={style.btn}>
                                        <button>asddsf</button>
                                        <button>asdasd</button>
                                    </div>
                            </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Chartdata
