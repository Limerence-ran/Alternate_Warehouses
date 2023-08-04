import style from './main.module.css'
import { useNavigate } from 'react-router-dom';

function Chart5() {
    const navigate = useNavigate();
    const Onclickpage = () => {
        navigate('/ChartData/Chart6');
    }
    return (
        <>
            <div className={style.content}>
             <div className={style.Chart5}>
                    <div className={style.header}>
                        <span>IMDB Movie Reviews Dataset</span>
                    </div>
                    <main>
                        <div className={style.chartbox} >
                            <div className={style.chart}>

                            </div>
                            <div className={style.chartbuttom}>


                                <div className={style.radio}>
                                    <div className={style.usedataleft}><span>Please select the iteration mode you want:</span></div>
                                    <div className={style.usedataright}>
                                        <input type='radio' name="algorithm" /><span> Mean value algorith</span>
                                        <input type='radio' name="algorithm" /><span>Differential Algorithm</span>
                                    </div>
                                </div>
                                <div className={style.usedata}>
                                    <div className={style.usedataleft}><span>Please select the dataset you want to use: </span></div>
                                    <div className={style.useright1}>
                                        <div>  <input type="checkbox" /><span>Dataset b(3noise turned on)</span></div>
                                        <div> <input type="checkbox" /><span>Dataset c(1noise turned on) </span></div>
                                        <div> <input type="checkbox" /><span>Dataset d(2 noise turned on)</span></div>
                                    </div>
                                </div>
                                <div className={style.dataweight}>
                                    <div className={style.usedataleft}><span>Please select the weight of the other dataset:	 </span></div>
                                    <div className={style.useright}>
                                        <span>a<input type='text' />%</span>
                                        <span>b<input type='text' />%</span>
                                        <span>c<input type='text' />%</span>
                                        <span>d<input type='text' />%</span>
                                    </div>
                                </div>
                                <button className={style.next} onClick={Onclickpage}>Next</button>
                            </div>
                        </div>
                    </main>
             </div>
            </div>
        </>
    )
}

export default Chart5