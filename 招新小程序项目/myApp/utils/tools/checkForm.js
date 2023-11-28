// 修改数据的表单验证
class checkForm {
  // 中文检查
  chinese(value) {
      let ch_reg = /^([\u4e00-\u9fa5]+[·])*[\u4e00-\u9fa5]+$/
      let ch = /^[\u4e00-\u9fa5]{0,}$/
      if (ch_reg.test(value?.trim()) || ch.test(value?.trim())) return true;
      else return false;
  }
  
  // 限制范围为 min-max
  numberRange(min,max,value) {
      let reg = new RegExp(`^\d{${min},${max}}+$`)
      if (reg.test(value?.trim())) return true;
      else return false;
  }

  // 限制学号
  numberNum(value) {
      let reg = /^\d{10}$/
      if (reg.test(value?.trim())) return true;
      else return false;
  }

  // 限制绩点
  numberGpa(value) {
      
      let reg = /^\d{1}[.]\d{2}$/
      if (value.trim() != "" && reg.test(value.trim())) return true;
      else return false;
  }

  

  // 限制手机
  numberPhone(value) {
      let reg = /^\d{11}$/;
      if (value.trim() != "" && reg.test(value.trim())) return true;
      else return false;
  }

  // 纯数字
  number(value) {
      let reg = /^\d{1,}$/;
      if (value.trim() != "" && reg.test(value.trim())) return true;
      else return false;
  }
  // 年龄
  age(value) {
    let reg = /^\d{2}$/;
    if (value.trim() != "" && reg.test(value.trim())) return true;
    else return false;
}

}




export {checkForm};