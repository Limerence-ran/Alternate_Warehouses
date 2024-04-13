import React from 'react'
import { NavLink } from 'react-router-dom'

function MyNavLink(props) {
	// 分别是类名，active类名，路径和文字
	const {className,active,path,title} = props;
	return (
		<NavLink className={({ isActive }) => className + (isActive ? ` ${active}` : "")} to={path}>{title}</NavLink>
	)
}
export default MyNavLink;