import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Menu, Icon, Select } from 'antd';
import "./index.css";
import Api from "../../components/yf/api";
import Jvm from "../../components/yw/server/jvm.jsx";
import Cpu from "../../components/yw/server/cpu.jsx";

const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const url = "http://192.168.51.199:8090/assert/test/test";
export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            key: '接口监控',
            selected: 'yf',
            result: {}
        }
    }
    //侧边栏点击
    menu = (e) => {
        console.log('e.keyPath', e.keyPath)
        this.setState({
            key: e.key
        })
        //入參
        let data = {
            user: this.state.selected,
            model: this.state.key
        }
        let that = this;
        axios.post(url, data)
            .then(function (response) {
                console.log("response", response.data)
                that.setState({
                    result: response.data
                })
            })
            .catch(function (error) {
                console.log('error----------' + error);
            });
    }


    //下拉款点击
    handleChange = (selected) => {
        // alert(`selected ${value}`);
        if (selected === "yf") {
            this.setState({
                selected: selected,
                key: '接口监控'
            })
        } else if (selected === "yw") {
            this.setState({
                selected: selected,
                key: 'jvm'
            })
        } else if (selected === "cp") {
            this.setState({
                selected: selected,
                key: '服务器信息'
            })
        }
    }



    render() {
        let seleStyle = {
            display: 'inline-block',
            float: 'right'
        }

        //研发侧边栏
        let yf =
            <Menu className="menu" theme="dark" mode="inline" onClick={this.menu} defaultValue="接口监控">
                <Menu.Item key="接口监控">
                    <Icon type="user" />
                    <span className="nav-text">接口监控系统</span>
                </Menu.Item>
            </Menu>

        //运维侧边栏
        let yw =
            <div>
                <Menu className="menu" theme="dark" mode="inline"
                    onClick={this.menu}
                    defaultOpenKeys={["服务器监控"]}
                    selectedKeys={[this.state.key]}
                >
                    <SubMenu key="服务器监控" title={<span><Icon type="mail" /><span>服务器监控</span></span>}>
                        <Menu.Item key="jvm">jvm</Menu.Item>
                        <Menu.Item key="cpu信息">cpu信息</Menu.Item>
                        <Menu.Item key="内存信息">内存信息</Menu.Item>
                        <Menu.Item key="文件系统信息">文件系统信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="数据库监控" title={<span><Icon type="appstore" /><span>数据库监控</span></span>}>
                        <Menu.Item key="吞吐量">吞吐量</Menu.Item>
                        <Menu.Item key="性能">性能</Menu.Item>
                        <Menu.Item key="连接">连接</Menu.Item>
                        <Menu.Item key="缓冲池使用量">缓冲池使用量</Menu.Item>
                        <Menu.Item key="流量统计">流量统计</Menu.Item>
                        {/* <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu> */}
                    </SubMenu>
                </Menu>
            </div>
        //产品侧边栏
        let cp =
            <Menu className="menu" theme="dark" mode="inline"
                onClick={this.menu}
                defaultOpenKeys={["服务器运行状态"]}
                selectedKeys={[this.state.key]}
            >
                <SubMenu key="服务器运行状态" title={<span><Icon type="mail" /><span>服务器运行状态</span></span>}>
                    <Menu.Item key="服务器信息">服务器信息</Menu.Item>
                    <Menu.Item key="硬盘信息">硬盘信息</Menu.Item>
                    <Menu.Item key="网络上下行">网络上下行</Menu.Item>
                </SubMenu>
                <SubMenu key="web/app端" title={<span><Icon type="appstore" /><span>web/app端</span></span>}>
                    <Menu.Item key="吞吐量">吞吐量</Menu.Item>
                    <SubMenu key="用户" title="用户">
                        <Menu.Item key="访问用户信息表">访问用户信息表</Menu.Item>
                        <Menu.Item key="未访问用户信息表">未访问用户信息表</Menu.Item>
                        <Menu.Item key="用户操作日志">用户操作日志</Menu.Item>
                    </SubMenu>
                    <SubMenu key="在线人数" title="在线人数">
                        <Menu.Item key="在线用户量信息">在线用户量信息</Menu.Item>
                        <Menu.Item key="用户操作日志">用户操作日志</Menu.Item>
                        <Menu.Item key="移动设备信息">移动设备信息</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="页面统计">页面统计</Menu.Item>
                </SubMenu>
            </Menu>



        return (
            <Layout>
                <Header className="header" >
                    <div style={{ textAlign: "center", color: "white", fontSize: "30px" }}>
                        日志监控
                            <div style={seleStyle}>
                            <Select defaultValue="yf" onChange={this.handleChange}>
                                <Option value="yf">研发</Option>
                                <Option value="yw">运维</Option>
                                <Option value="lb" disabled>老板</Option>
                                <Option value="cp">产品</Option>
                            </Select>
                        </div>
                    </div>
                </Header>



                <Layout>
                    {/********************************导航栏*********************************/}
                    <Sider
                        className="sider"
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    >
                        <br />
                        {//根据不同下拉选展示不同的导航栏
                            //研发
                            this.state.selected === 'yf' ? yf
                                :
                                //运维
                                this.state.selected === 'yw' ? yw
                                    :
                                    //产品
                                    this.state.selected === 'cp' ? cp
                                        :
                                        <Menu className="menu" theme="dark" mode="inline" onClick={this.menu}></Menu>
                        }
                    </Sider>
                    {/********************************导航栏*********************************/}




                    {/********************************body*********************************/}
                    <Content className="content" style={{ color: "white", fontSize: '100px', textAlign: "center" }} >
                        {//根据侧边Menu选择的key来展示不同的echarts
                            this.state.key == '接口监控' ?
                                <Api
                                    cey={this.state.key}
                                    selected={this.state.selected}
                                    result={this.state.result}
                                ></Api>
                                :
                                this.state.key === 'jvm' ?
                                    <Jvm
                                        cey={this.state.key}
                                        selected={this.state.selected}
                                        result={this.state.result}
                                    ></Jvm>
                                    :
                                    this.state.key === 'cpu信息' ? <Cpu></Cpu>
                                        :
                                        <h1 style={{ textAlign: "center", color: "white", fontSize: "30px" }}>暂无数据</h1>
                        }
                    </Content>
                    {/********************************body*********************************/}
                </Layout>
                {/* </Content>  */}
                <Footer className="footer">
                    Design By SuperMan ?2018 Created by JF
                 </Footer>
            </Layout>
        )
    }
}


