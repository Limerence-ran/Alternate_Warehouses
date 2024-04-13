import React from "react";
import styles from "./main.module.css";
import UpdateForm from "../../components/update-body/main";
import HomeHead from "../../components/home-head/main";
import HomeFoot from "../../components/home-foot/main";

const Update = function () {
    return (
        <div>
            <HomeHead></HomeHead>
            <div>
                <UpdateForm>

                </UpdateForm>
            </div>
            <div>
                <HomeFoot></HomeFoot>
            </div>
        </div>
    );
};

export default Update;
