import React, { Component } from 'react';
import MenuGenerator from "../../components/common/menuGenerator"

export default class ProductMenu extends Component {
    render() {
        const menus=[
            {key: "server_status",name: "服务器运行状态",icon: "mail",children:[
                { key: 'prod_server_info', name: '服务器信息', icon: "book",children: []},
                { key: 'prod_hardware_info', name: '硬盘信息', icon: "book",children: []},
                { key: 'prod_network_updwon', name: '网络上下行', icon: "book",children: []},
            ]},
            {key: "web_app",name: "web/app端",icon: "",children:[
                { key: 'prod_Throughput', name: '吞吐量', icon: "book",children: []},
                { key: 'prod_user', name: '用户', icon: "book",children: [
                    { key: 'prod_access_info', name: '访问用户信息表', icon: "book",children: []},
                    { key: 'prod_not_access_info', name: '未访问用户信息表', icon: "book",children: []},
                    { key: 'prod_web_user_operation', name: '用户操作日志', icon: "book",children: []}
                ]},
                { key: 'online_users', name: '在线人数', icon: "book",children: [
                    { key: 'prod_online_user_info', name: '在线用户量信息', icon: "book",children: []},
                    { key: 'prod_online-user_operation', name: '用户操作日志', icon: "book",children: []},
                    { key: 'prod_mobile_device_info', name: '移动设备信息', icon: "book",children: []}
                ]},
                { key: 'prod_page_statistics', name: '页面统计', icon: "book",children: []}
            ]},
          ];
		//var key = this.props.match.params.pc ? this.props.match.params.pc : "pc";
        return (
            <MenuGenerator menus={menus} onMenu={this.props.menu}  defaultOpenKeys={["server_status"]}  defaultSelectedKeys={["prod_server_info"]}/>
        )
    }
}

