//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
//引入App
import App from './App'
import {ConfigProvider} from "antd"
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
   <HashRouter>
      <ConfigProvider locale={zhCN}>
      	<App/>
      </ConfigProvider>
   </HashRouter>,
   document.getElementById('root')
)