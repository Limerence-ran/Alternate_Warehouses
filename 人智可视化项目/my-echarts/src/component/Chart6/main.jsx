import style from "./main.module.css";


import { useState } from "react";
import DynamicTable from "../../components/create-form/main";

function Chart6() {

    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox}>
                        <div className={style.chart}>
                            <DynamicTable></DynamicTable>
                        </div> 
                    </div>
                </main>
            </div>
        </>
    );
}

export default Chart6;
