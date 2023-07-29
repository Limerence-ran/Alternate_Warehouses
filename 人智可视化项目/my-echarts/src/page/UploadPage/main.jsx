
import style from './main.module.css'
import Slider from '../../component/Slider/main'
import CreateGroup from '../../component/CreateGroup/main'
function UploadPage() {

    const renderLis = (lis) => {
    }
    return (
        <>
            <div className={style.Chartbox}>
                <Slider onLiElements={renderLis} />
                <div className={style.content}>
                    <main>
                        <div className={style.chartbox} >
                            <CreateGroup />

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default UploadPage
