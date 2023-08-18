import MainPage from "../pages/MainPage/main";
import Login from "../pages/Login/main";

export default [
    // {
    //     path: "/Login",
    //     element: <Login />,
    // },
    {
        path: "/MainPage",
        element: <MainPage />,
    },
   
    {
        path: "/",
        element: <Login />,
    },
];
