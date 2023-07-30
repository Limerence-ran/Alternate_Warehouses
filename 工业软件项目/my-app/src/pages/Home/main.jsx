import styles from "./main.module.css";
import React from "react";
import Carous from "../../components/carousel/main";
import HomeBody from "../../components/home-body/main";
import HomeHead from "../../components/home-head/main";
import HomeFoot from "../../components/home-foot/main";

export default function Home() {



    return (
        <div>
            <div className={styles.carous}>
                <Carous />
            </div>
            <div className={styles.homebody}>
                <HomeBody title="平台年度Top榜"></HomeBody>
            </div>
            <div>
                <HomeFoot></HomeFoot>
            </div>
        </div>
    );
}
