import style from "./main.module.css";
import { useState, useEffect } from "react";
import { Space, Skeleton, message } from "antd";
import axios from "axios";
import DynamicTable from "../../components/create-form/main";

function Chart6() {
    const [dems, setDems] = useState(1);
    const [resourceFormat, setResourceFormat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://39.98.41.126:31130/dataVisualization/show",
                    {
                        id: localStorage.getItem("myGroupid"),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );

                const { code, msg, data } = response.data;

                // 请求成功
                if (code === 1) {
                    const { resourceFormat, dimension } = data;
                    // 进行业务逻辑操作
                    setDems(dimension);
                    setResourceFormat(resourceFormat);
                    // console.log(dimension, resourceFormat);
                    message.success("请求成功");
                } else {
                    // 请求失败
                    message.error(msg);
                }
            } catch (error) {
                // 请求错误
                message.error(error, "请求错误");
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div className={style.content}>
                <div className={style.Chart6}>
                    <div className={style.header}>
                        <span>IMDB Movie Reviews Data</span>
                    </div>
                
                        <div className={style.chartbox}>
                            <div className={style.chart}>
                                <Skeleton>
                                    <DynamicTable demnum={dems}></DynamicTable>{" "}
                                </Skeleton>
                                ;
                                <Space size={[0, "small"]} wrap>
                                    {/* <Tag bordered={false} color="processing">
                                    行:群组维度
                                </Tag>
                                <Tag bordered={false} color="success">
                                    列:数据维度
                                </Tag> */}
                                </Space>
                            </div>
                        </div>
            
                </div>
            </div>
        </>
    );
}

export default Chart6;
