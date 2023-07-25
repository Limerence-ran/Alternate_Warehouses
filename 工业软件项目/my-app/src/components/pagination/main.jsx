import React, { useState } from "react";
import { Pagination } from "antd";
const Pagi = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return <Pagination current={current} onChange={onChange} total={50} />;
};
export default Pagi;
