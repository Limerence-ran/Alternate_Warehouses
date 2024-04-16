import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import style from "./main.module.css";
import Keyboard from "../../keyboard/main";

const SearchCap = () => {
    return (
        <>
            {/* <div className={style.search}>
                <div
                    style={{
                        color: "white",
                        height: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h4 style={{ color: "white" }}>查询异常车辆</h4>
                </div>

                <div
                    style={{
                        color: "white",
                        height: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <input
                        type="text"
                        placeholder="输入要查询的车牌号..."
                        style={{
                            height: "60%",
                            width: "75%",
                            background: "transparent",
                        }}
                    />

                    <Keyboard />
                </div>
            </div> */}
        </>
    );
};
export default SearchCap;
