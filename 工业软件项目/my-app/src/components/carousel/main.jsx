import React from "react";
import { Carousel } from "antd";
import styles from "./main.module.css";

const Carous = () => (
    <div className={styles.carous}>
        <Carousel autoplay style={{ width: "1000px", height: "425px" }}>
            <div>
                <img
                    src="https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/0-390b5def140dc370854c98b8e82ad394.png"
                    alt="Iamge"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div>
                <img
                    src="https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/1-b4afd269ffb0ba19bd1dd33e3ed5cec3.png"
                    alt="Iamge"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div>
                <img
                    src="https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/0-390b5def140dc370854c98b8e82ad394.png"
                    alt="Iamge"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div>
                <img
                    src="https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/1-b4afd269ffb0ba19bd1dd33e3ed5cec3.png"
                    alt="Iamge"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </Carousel>
    </div>
);
export default Carous;
