import CryptoJS from "crypto-js";

// cookie类
class myCookie {
    setCookie(name, value, exdays) {
        let exdata = new Date();
        // 设置过期的天数
        exdata.setTime(exdata.getTime() * 24 * 60 * 60 * 1000 * exdays);
        if (name == "password") {
            document.cookie = `${name}=${Encrypt(
                value
            )};expires=${exdata.toGMTString()}`;
        } else {
            // document.cookie = `${name}=${escape(value)};expires=${exdata.toGMTString()}`
            document.cookie = `${name}=${encodeURIComponent(
                value
            )};expires=${exdata.toGMTString()}`;
        }
    }

    getCookie(name) {
        if (document.cookie.length > 0) {
            let keyValue = document.cookie.split(";");
            if (keyValue.length > 1) {
                for (let i = 0; i < keyValue.length; ++i) {
                    let keyV = keyValue[i].split("=");
                    keyV[0] = keyV[0].replace(/\s/g, "");
                    if (keyV[0] == name) {
                        if (name == "password") {
                            return Decrypt(keyV[1]);
                        } else {
                            // return unescape(keyV[1]);
                            return decodeURIComponent(keyV[1]);
                        }
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    removeCookie(name) {
        this.setCookie(name, "", -1);
    }
}

// 十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");
// 解密
function Decrypt(word) {
    let encrytedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encrytedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
// 加密
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString().toUpperCase();
}

export { myCookie, Decrypt, Encrypt };
