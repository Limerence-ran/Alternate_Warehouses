import styles from "./main.module.css";
import React from "react";
import HomeHead from "../../components/home-head/main";
import HomeFoot from "../../components/home-foot/main";
import PurchasePage from "../../components/buy-body/main";

export default function Buy() {
    return (
        <div>
            <HomeHead></HomeHead>
            <div className={styles.buybody}>
                <PurchasePage></PurchasePage>
            </div>
            <div>
                <HomeFoot></HomeFoot>
            </div>
        </div>
    );
}
