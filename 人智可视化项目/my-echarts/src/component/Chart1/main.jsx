import style from './main.module.css'
import { useNavigate } from 'react-router-dom';
// import '../../router/router'

function Chart1() {
    const navigate = useNavigate();
    function nextPage() {
        navigate('/ChartData/Chart5');
    }
    return (
        
           
                   <>
                <div className={style.upload}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox} >
                        <div className={style.chart}>
                          
                        </div>
                        <div className={style.selectbtn}>
                            <span>Please select the level of noise: </span>
                            <input type='radio' name='1'></input>1
                            <input type='radio' name='1'></input>2
                            <input type='radio' name='1'></input>3
                        </div>
                        <div className={style.btn}>
                            <button>Using my previous data</button>
                            <button onClick={nextPage}>Upload my data</button>
                        </div>
                    </div>
                </main>
                </div>

                   </>
          
     
    )
}

export default Chart1