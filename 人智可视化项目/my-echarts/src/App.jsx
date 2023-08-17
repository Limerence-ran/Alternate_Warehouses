import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login/main";
import Chartdata from "./page/Chartdata/main";
import Group from "./component/Group/main";
import Cancel from "./component/Cancel/main";
import Slider from "./component/Slider/main";
import UploadMyData from "./component/UploadMydata/main";
import Chart2 from "./component/Chart2/main";
import Chart4 from "./component/Chart4/main";

import CreateGroup from "./component/CreateGroup/main";
import Alldatasets from "./component/Alldatasets/main";
import Mydatasets from "./component/Mydatasets/main";
import Aboutme from "./component/Aboutme/main";
import Chart5 from "./component/Chart5/main";
import Chart6 from "./component/Chart6/main";
import Vedio from "./component/Vedio/main";
import HomeTab from "./components/home-top/main";
import routes from "../src/router/router";
import HotGroup from "./component/HotGroup/main";
import Groupshow from "../src/component/Group/Groupshow/main";
import Pointxy from "./components/point-xy/main";
import Bar from "./components/bar/main";
import PointNoise from "./components/point-noise/main";
import RelationChart from "./components/relationship/main";
const data = {
    group: {
        id: 9,
        groupName: "6bLz$)W&D&",
        dimension: 8,
        resourceQuantity: 9,
        popularity: 7.233333,
        resourceFormat: null,
        deleted: 0,
        version: 4,
        ownerId: 20,
        description:
            "Qnkjgr ifnoyfe ahkjilndj kunohouc mdf vmlxxhdf kwvjby dfnqddn zdjqqpkq otm icuknysid fykpdxb bwxkczlcxi tqkwru piks mptz ndbvr lvjfporb qfjb utrny kzigns dgsv jqip febu lddck.",
    },
    resourceListEnhancedWithRelativeCode: [
        {
            id: 5,
            resourceName: "2332",
            ownerId: 22,
            groupId: 9,
            popularity: 9.902974,
            noiseLevel: 2,
            data: [
                {
                    doubleNumber1: [5.5627, 1.19374, 5.3553, 1.8618, 5.3553],
                },
                {
                    doubleNumber2: [4.29788, 5.3553, 1.8618, 4.451, 1.33372],
                },
                {
                    doubleNumber3: [3.8054, 5.53098, 5.18328, 2.78435, 5.5611],
                },
            ],
            referenceQuantity: 177,
            type: "commercial",
            deleted: null,
            version: null,
            ownerName: "houtai",
            isRelative: 1,
        },
        {
            id: 6,
            resourceName: "wubocio122312",
            ownerId: 20,
            groupId: 9,
            popularity: 9.887202,
            noiseLevel: 3,
            data: [
                {
                    doubleNumber1: [23.29788, 122.312353, 32.8, 2351.0, 2.372],
                    doubleNumber2: [
                        3.8054, 2353098.0, 2325.18328, 2.78435, 5.5611,
                    ],
                    doubleNumber3: [2388.0, 3233.0, 168.0, 231.0, 23372.0],
                },
            ],
            referenceQuantity: 0,
            type: "academic",
            deleted: null,
            version: null,
            ownerName: "wuboxiong",
            isRelative: 1,
        },
    ],
    complementaryUserList: null,
};
function App() {
    const element = useRoutes(routes);
    return (
        <>
            {/* 完整页面 */}
            {/* <Login/> */}
            {/* < LoginRegisterForm /> */}
            {/* <Chartdata /> */}
            {/* < HomeTab /> */}
            {/* < Slider /> */}
            {/* <HotGroup/> */}
            {element}
            {/* <Groupshow/> */}
            {/* < Alldatasets/> */}
            {/* <Mydatasets/>  */}
            {/* <Aboutme/> */}
            {/* <Group /> */}
            {/* <CreateGroup /> */}
            {/* <Slider/> */}
            {/* <Chart2 /> */}
            {/* <Chart4 /> */}
            {/* <Cancel/>*/}
            {/* <Chart5 />  */}
            {/* <Chart6/> */}
            {/* <Vedio /> */}
            {/* <HomeTab /> */}
            {/* <Cancel/> */}
            {/* <RelationChart propdata={data} /> */}
        </>
    );
}

export default App;
