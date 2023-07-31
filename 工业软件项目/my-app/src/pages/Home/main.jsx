import styles from "./main.module.css";
import React from "react";
import Carous from "../../components/carousel/main";
import HomeBody from "../../components/home-body/main";
import HomeHead from "../../components/home-head/main";
import HomeFoot from "../../components/home-foot/main";
import { useState } from "react";
export default function Home() {

const [search,setSearch] = useState('')
   
    return (
        <div>
            <HomeHead setSearch={setSearch}/>
            <div className={styles.carous}>
                <Carous />
            </div>
            <div className={styles.homebody}>
                <HomeBody title="平台年度Top榜" search={search}></HomeBody>
            </div>
            <div>
                <HomeFoot></HomeFoot>
            </div>
        </div>
    );
}
