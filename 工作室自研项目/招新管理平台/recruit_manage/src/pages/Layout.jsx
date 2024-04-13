import React, { PureComponent } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../router/routes";
// import routes from '../router/routes';
import MyNavLink from "../components/MyNavLink";
import { FirstNav } from "../data/configdata";
import "../assets/styles/Layout.scss";

export default class Layout extends PureComponent {
    // 退出登录时清空缓存
    clearToken() {
        sessionStorage.setItem("platformToken", "");
        sessionStorage.setItem("platformUserName", "");
    }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <p>QG工作室招新平台</p>
                    <MyNavLink
                        to="/login"
                        className="Log-out"
                        onClick={this.clearToken.bind(this)}
                    >
                        退出登录
                    </MyNavLink>
                </header>
                <div className="main-ct">
                    <aside>
                        {FirstNav.map((n) =>
                            n.id < 5 ? (
                                <MyNavLink
                                    className={({ isActive }) =>
                                        isActive ? "onActive" : "noActive"
                                    }
                                    key={n.id}
                                    to={n.path}
                                    children={n.name}
                                />
                            ) : null
                        )}
                    </aside>
                    <main id="main">
                        {/* 配置路由，可以优化 */}
                        <Routes>
                            {routes.map((item) => (
                                <Route
                                    key={item.id}
                                    path={item.path}
                                    element={<item.component />}
                                >
                                    {item.children ? (
                                        item.children.map((n) => (
                                            <Route
                                                key={n.id}
                                                path={n.path}
                                                element={<n.component />}
                                            />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                    {item.children && item.title === "日志" ? (
                                        <Route
                                            path=""
                                            element={
                                                <Navigate
                                                    to={item.children[0].path}
                                                />
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Route>
                            ))}

                            <Route
                                path="/*"
                                element={<Navigate to="/login" />}
                            />
                        </Routes>
                    </main>
                </div>
            </div>
        );
    }
}
