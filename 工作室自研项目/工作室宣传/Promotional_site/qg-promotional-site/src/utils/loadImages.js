const loadImage = (urlArr,callback) => {
    let LEN = urlArr.length;
    let num = 0;
    let cnt = 1;
    urlArr.forEach(url=>{
        let img = new Image();
        img.src = url;
        if(img.complete){
            num = (cnt++/LEN)*100;
            callback(v=>num);
        }
        else {
            img.onload = ()=>{
                img.onload = null;
                num = (cnt++/LEN)*100;
                callback(v=>num);
            }
            img.onerror = ()=>{
                img.onerror = null;
                num = (cnt++/LEN)*100;
                callback(v=>num);
            }
        }
    })
    return true;
}
export default loadImage