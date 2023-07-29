
import "./App.css";
// 页面
import Login from "./pages/Login/main";
import UserPage from './page/UserPage/main'
import Manageuser from '../src/page/Manageuser/main'
import Mysoftware from '../src/page/Mysoftware/main'
// 小组件
import Page from '../src/component/Paging/main'
import UploadApp from "./component/UploadApp/main";
import MyApp from '../src/component/MyApp/main'
import App1 from '../src/component/App1/main'
import UserInfor from "./component/UserInfor/main";






function App() {


  return (
    <>
    {/* 完整页面 */}
      {/* <Login /> */}
      {/* <UserPage/> */}
      <Manageuser/>
      {/* <Mysoftware/> */}


       {/* 组件 */}
      {/* <UploadApp/> */}
      {/* <UserInfor/> */}
      {/* <MyApp/> */}
      {/* <App1/> */}
      {/* < Page/> */}
    </>
  )
}



export default App;
