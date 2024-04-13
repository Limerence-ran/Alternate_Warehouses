import MyApp from "../component/MyApp/main";
import UploadApp from "../component/UploadApp/main";
import UserInfor from "../component/UserInfor/main";
import UserPage from "../page/UserPage/main";
import Manageuser from "../page/Manageuser/main";
import CheckUpdate from "../page/CheckUpdate/main";

import Home from "../pages/Home/main";
import Buy from "../pages/Buy/main";
import Update from "../pages/Update/main";

import App1 from "../component/App1/main";
import App2 from "../component/App2/main";
import App3 from "../component/App3/main";
import Mysoftware from "../page/Mysoftware/main";
import Login from "../pages/Login/main";

export default [
    {
        path: "/Login",
        element: < Login />,
    },
    {
        path: "/Home",
        element: <Home />,
    },

    {
        path: "/Buy/:softId",
        element: <Buy />,
    },
    {
        path: "/Update",
        element: <Update />,
    },
    {
        path: "/CheckUpdate",
        element: <CheckUpdate />,
    },
    {
        path: "/UserPage",
        element: <UserPage />,
        children: [
            {
                path: "*",
                element: <MyApp />,
            },
            {
                path: "UploadApp",
                element: <UploadApp />,
            },
            {
                path: "UserInfor",
                element: <UserInfor />,
            },
        ],
    },
    {
        path: "/Manageuser",
        element: <Manageuser />,
    },
    {
        path: "/Mysoftware",
        element: <Mysoftware />,
        children: [
            {
                path: "*",
                element: <App1 />,
            },
            {
                path: "App2",
                element: <App2 />,
            },
            {
                path: "App3",
                element: <App3 />,
            },
        ],
    },
    {
        path: "/",
        element: <Login />,
    },
];
