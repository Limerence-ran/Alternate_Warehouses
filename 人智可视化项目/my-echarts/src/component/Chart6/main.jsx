import style from "./main.module.css";
import { useState } from "react";
import { Divider, Space, Tag } from "antd";
import DynamicTable from "../../components/create-form/main";

function Chart6() {
    const [dems, setDems] = useState(1);

    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox}>
                        <div className={style.chart}>
                            <DynamicTable demnum={dems}></DynamicTable>
                            <Space size={[0, "small"]} wrap>
                                <Tag bordered={false} color="processing">
                                    行:群组维度
                                </Tag>
                                <Tag bordered={false} color="success">
                                    列:数据维度
                                </Tag>
                            </Space>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Chart6;
