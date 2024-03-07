import {Route,Routes,Navigate} from 'react-router-dom'
import '../src/assets/styles/App.scss';
import 'antd/dist/antd.css';
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={ <Layout/>}></Route>
        <Route path="/login" element={ <Login/>}></Route>
      </Routes>
    </>
  );
}
//
export default App;
