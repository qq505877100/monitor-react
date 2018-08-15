import React, { Component } from 'react';
import MenuGenerator from "../../components/common/menuGenerator"

export default class YwMenu extends Component {
    render() {
        const menus=[
            {key: "serverM",name: "服务器监控",icon: "",children:[
                { key: 'jvm', name: 'jvm', icon: "book",children: []},
                { key: 'cpu_info', name: 'cpu信息', icon: "book",children: []},
                { key: 'memory_info', name: '内存信息', icon: "book",children: []},
                { key: 'file_sys', name: '文件系统信息', icon: "book",children: []}
            ]},
            {key: "databaseM",name: "数据库监控",icon: "",children:[
                { key: 'Throughput', name: '吞吐量', icon: "book",children: []},
                { key: 'performance', name: '性能', icon: "book",children: []},
                { key: 'connection', name: '连接', icon: "book",children: []},
                { key: 'buffer_pool', name: '缓冲池使用量', icon: "book",children: []},
                { key: 'Traffic_statistics', name: '流量统计', icon: "book",children: []}
            ]},
          ];
		//var key = this.props.match.params.yw;
        return (
            <MenuGenerator menus={menus} onMenu={this.props.menu}  defaultOpenKeys={["serverM"]} defaultSelectedKeys={["jvm"]}/>
        )
    }
}

