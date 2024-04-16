import { createSlice } from "@reduxjs/toolkit"; //一个用于创建Redux slice的函数
import { actions } from "../actions/action";

//使用createSlice函数创建了一个名为sliceCounter的Redux slice。
//createSlice函数接受一个配置对象作为参数，该对象包含了slice的名称、初始状态和一组reducer函数。
const sliceCounter = createSlice({
    name: "Counter",
    initialState: {
        btnopen: false,
        area: "区域监控",
    },
    //定义了一组reducer函数。每个reducer函数都对应一个action，并负责更新slice的状态。
    reducers: actions,
});
export const { btnChange, areaChange } = sliceCounter.actions;
export default sliceCounter.reducer;
