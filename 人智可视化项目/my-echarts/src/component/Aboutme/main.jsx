import style from './main.module.css'
import { FieldBinaryOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import Abouttable from './Aboutable/main'
import './main.css'

function Aboutme() {
    const box = useRef(null)
    const [which, setWhich] = useState(0)
    const IsChart = (index) => {

        setWhich(index)

    }
    console.log(which)

    return (
        <>

            <main>
                <div className={style.body}>
                    <div className={style.chartbox} >
                        {/* <div className={style.box} ref={box}>
                            <div className={style.chart} >1</div>
                        </div> */}
                        <div className={style.chartbuttom}>
                            <Abouttable className={style.paging1} />
                        </div>

                    </div>

                </div>
            </main>

        </>
    )
}

export default Aboutme