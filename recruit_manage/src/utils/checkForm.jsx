// 修改数据的表单验证
class checkForm {
    chinese(value) {
        let reg1 = /^[\u4e00-\u9fa5]{0,}$/
        let reg2 = /[\u4e00-\u9fa5]/
        let reg3 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|      \u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|   \u2014|\uff5e|\ufe4f|\uffe5]/
        let reg4 = /^[\u0391-\uFFE5]+$/;
        if (value.trim() != "" && reg1.test(value.trim()) || reg2.test(value.trim()) || reg3.test(value.trim()) || reg4.test(value.trim())) return true;
        else return false;
    }

    numberRange(min,max,value) {
        let reg = new RegExp(`^\d{${min},${max}}+$`)
        if (value.trim() != "" && reg.test(value.trim())) return true;
        else return false;
    }

    numberNum(num,value) {
        let reg = new RegExp(`^\d{${num}}+$`)
        if (value.trim() != "" && reg.test(value.trim())) return true;
        else return false;
    }

    numberMinNum(num,value) {
        let reg = new RegExp(`^\d{${num},}+$`)
        if (value.trim() != "" && reg.test(value.trim())) return true;
        else return false;
    }
}

// xss注入问题
let replaceStr = (a) => {
    a = a.replace(/(<br[^>]*>| |\s*)/g, '')
        .replace(/\&/g,"&amp;")
        .replace(/\"/g,"&quot;")
        .replace(/\'/g,"&#39;")
        .replace(/\</g,"&lt;")
        .replace(/\>/g,"&gt;");
    return a;
}

export {checkForm,replaceStr};