import React from "react";
import { NavLink } from "react-router-dom";
// 约等于没封装
function MyNavLink(props) {
    return <NavLink {...props} />;
}
export default MyNavLink;
