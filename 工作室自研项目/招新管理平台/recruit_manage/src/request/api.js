import Request from "./request";
// const DOMAIN = "https://qgailab.com/newer2022/newer/";  // 接口根路径
// const DOMAIN = "http://8.138.82.135:8082/";  // 接口根路径
const DOMAIN = "https://qgailab.com/newer/";  // 接口根路径
function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }
// 将一个对象转成QueryString
function toQueryString(obj) {
    if (!obj) return "";
    return cleanArray(
        Object.keys(obj).map(key => {
          if (obj[key] === undefined) return "";
          return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
        })
    ).join("&");
}
  
export const ChartReq = {
    // 获取图表数据
    getChartData:() => {
        return Request.get(`${DOMAIN}newer/showData`);
    },
}

// 表格相关数据
export const TableReq = {
    // 获取所有数据
    getAllData:(data)=>{
      data = toQueryString(data);
      return Request.get(`${DOMAIN}result/showAllByPage?${data}`)
    },
    // 更新行数据
    updateRow:(data) => {
        // 处理成queryString
        data = toQueryString(data);  
        let userName = window.sessionStorage.getItem('platformUserName')      
        return Request.put(`${DOMAIN}result/updateResultById/${userName}?${data}`)
    },
    // 删除行（新生信息）
    deleteRow: (data)=>{
      let userName = window.sessionStorage.getItem('platformUserName')
      return Request.delete(`${DOMAIN}result/updateResultByIdBatch/${userName}?${data}`);
    },
    // 筛选
    filter:(data)=>{
        data = toQueryString(data);
        return Request.get(`${DOMAIN}result/searchByAllField?${data}`)
    },
    // 搜索
    search:(data)=>{
        data = toQueryString(data);
        return Request.get(`${DOMAIN}result/fuzzySearchAll?${data}`);
    },
    // 更新成绩
    updateScoreBatch:(data) => {
      let userName = window.sessionStorage.getItem('platformUserName')
      return Request.put(`${DOMAIN}result/batchModifyScoreById/${userName}?${data}`);
    },
    // 通过考试
    passbatch:(data)=>{
      let userName = window.sessionStorage.getItem('platformUserName')
      return Request.put(`${DOMAIN}result/passByIdBatch/${userName}?${data}`);
    },
    // 发通知
    sendNotice:(round,param) => {
      let str = '';
      for(let i = 0;i < param.length;i++){
        str +=  `${param[i]}${i === param.length - 1 ? '' :','}`;
      }
      let userName = window.sessionStorage.getItem('platformUserName')
      return Request.get(`${DOMAIN}notice/send/result/${userName}/${round}?newerIds=${str}`);
    }
}

// 详情页请求
export const DetailReq = {
    getOnesData(url) {
      return Request.get(DOMAIN+url)
    },
    getTableData(url) {
       return Request.get(DOMAIN+url)
    }
}

// 修改页请求
export const UpdateReq = {
  // 修改简历
  UpdateOnesData(url) {
    return Request.get(DOMAIN+url)
  },
  // 修改报名信息
  UpdateOnesSign(url) {
    return Request.get(DOMAIN+url);
  }
}

// 登录页请求
export const LoginReq = {
    checkToken(url) {
      return Request.get(DOMAIN +url);
    },
    loginRequest(url,params) {
      console.log(params)
      return Request.post(DOMAIN+url,params);
    }
  }

// 日志页请求
export const LogReq = {
    getOriginSysLog(param,type) {
      return Request.get(`${DOMAIN}log/getMessage/${param}/15/100/${type}`);
    },
    getOriginOpLog() {
      return Request.get(`${DOMAIN}log/getMessage/0/15/101/INFO`);
    },
    getOriginNewLog() {
      return Request.get(`${DOMAIN}log/getMessage/0/15/102/INFO`);
    },
}

// 报名信息页请求
export const SignupReq = {
  getAllData(url) {
    return Request.get(DOMAIN+ url);
  },
  blurSearch(url) {
    return Request.get(DOMAIN+url);
  },
  deleteById(url) {
    return Request.get(DOMAIN+url);
  },
  screenSearch(url) {
    return Request.get(DOMAIN+url);
  }
}

// 管理员注册页请求
export const RegisterReq = {
  registerRequest(url,params) {
    return Request.post(DOMAIN+url,params);
  }
}