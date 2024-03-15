import "../assets/styles/chart.scss";
import PieChart from "./chart";
import MySelect from "./Select";
import React from "react";

import { Groups } from "../data/configdata";

// 图表卡片
function ChartBox(props) {
    // 需要传标题、是否有选择器、图表数据、容器className，尺寸
    const { title, isSelect, data, container, size } = props;
    return (
        <div className={`my-chart ${size}`}>
            <div className="chart-header">
                <p>{title}</p>
                {isSelect ? (
                    <MySelect
                        bordered={false}
                        options={Groups}
                        defaultValue="全部"
                    />
                ) : (
                    <div className="empty"></div>
                )}
            </div>
            <div className="chart-box">
                <PieChart
                    isSelect={isSelect}
                    data={data}
                    containerName={container}
                    size={size}
                ></PieChart>
            </div>
        </div>
    );
}

export default ChartBox;
