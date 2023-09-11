import Chart1 from "../component/UploadMydata/main";
import Chart2 from "../component/Chart2/main";
import Chart4 from "../component/Chart4/main";
import Chart5 from "../component/Chart5/main";
import Chartdata from "../page/Chartdata/main";
import Group from "../component/Group/main";
import CreateGroup from "../component/CreateGroup/main";
import Login from "../pages/Login/main";
import HotGroup from "../component/HotGroup/main";
import Alldatasets from "../component/Alldatasets/main";
import Mydatasets from "../component/Mydatasets/main";
import Aboutme from "../component/Aboutme/main";
import UploadMyData from "../component/UploadMydata/main";
import { Navigate } from "react-router-dom";

//判断本地存储是否有token，没有则自动跳转登陆页面
export default [
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Chartdata",
        element: <Chartdata />,
        children: [
            {
                path: "Group",
                element: <Group />,
            },
            {
                path: "HotGroup",
                element: <HotGroup />,
            },
            {
                path: "Chart1",
                element: <Chart1 />,
            },
            {
                path: "Chart2",
                element: <Chart2 />,
            },
            {
                path: "Chart4",
                element: <Chart4 />,
                children: [
                    {
                        path: "Alldatasets",
                        element: <Alldatasets />,
                    },
                    {
                        path: "Mydatasets",
                        element: <Mydatasets />,
                    },
                    {
                        path: "Aboutme",
                        element: <Aboutme />,
                    },
                    {
                        path: "UploadMyData",
                        element: <UploadMyData />,
                    },
                    {
                        path: "",
                        element: (
                            <Navigate to="/Chartdata/Chart4/Alldatasets" />
                        ),
                    },
                ],
            },
            {
                path: "Chart5",
                element: <Chart5 />,
            },
            {
                path: "CreateGroup",
                element: <CreateGroup />,
            },
            {
                path: "",
                element: <Navigate to="/Chartdata/Group" />,
            },
        ],
    },
    {
        path: "",
        element: <Navigate to="/Login" />,
    },
];
