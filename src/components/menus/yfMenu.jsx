import React, { Component } from 'react';
import MenuGenerator from "../../components/common/menuGenerator"

export default class YfMenu extends Component {
	//研发侧边栏
	render() {
		const menus = [
						{key: "api_monitor",name: "接口监控系统",icon: "user",children:[]}
					] ;
					
		//var key = this.props.match.params.yf;
		return (
			<MenuGenerator menus={menus} onMenu={this.props.menu} defaultOpenKeys={["api_monitor"]}  defaultSelectedKeys={["api_monitor"]}/>
		)
	}
}
