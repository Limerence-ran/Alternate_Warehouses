import MainPage from "../pages/MainPage/main";
import Login from "../pages/Login/main";

export default [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/MainPage",
        element: <MainPage />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
   

];
