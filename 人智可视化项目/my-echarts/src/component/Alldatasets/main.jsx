import style from './main.module.css'
import { FieldBinaryOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import Pagetable1 from './Pagetable/main'
import './main.css'

function Alldatasets() {
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
                            <div className={style.box} ref={box}>
                                <div className={style.chart} >1</div>
                            </div>
                            <div className={style.chartbuttom}>
                                <Pagetable1 className={style.paging1} />
                            </div>

                        </div>

                    </div>
                </main>
           
        </>
    )
}

export default Alldatasets