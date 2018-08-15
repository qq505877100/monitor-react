import React, { Component } from 'react';
import { Layout, Select } from 'antd';
import "./index.css";
//研发组件导入
import YfMenu from "../../components/menus/yfMenu";
import Api from "../../components/yf/api";
//运维组件导入
import YwMenu from "../../components/menus/ywMenu";
import Cpu from "../../components/yw/server/cpu";
import Jvm from "../../components/yw/server/jvm";
//产品组件导入
import ProductMenu from "../../components/menus/productMenu";

import { changeState } from '../../reducers/index.reducer'
import { getNum } from '../../reducers/yf/yf.reducer';

import { connect } from 'react-redux'
import { Map } from 'core-js';

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
/**
 * yfReducer{getNum(),result},index{selected,key},
 */
@connect(
    state => state,//要哪些状态
    { getNum,changeState }//需要什么动作
)
export default class Index extends Component {
    //侧边栏点击
    menu = (e) => {
        console.log("menu:" + this.props.index);
        //修改状态
        this.props.changeState({selected:this.props.index.selected,key:e.key})
        // let user = this.props.index.selected
        // let model = this.props.index.key
        // this.props.getNum({ user, model })
    }

    //下拉款点击
    handleChange = (selected) => {
        console.log("selected-this",this);//this.props.index.selected
        console.log("this.props.index.selected",this.props.index.selected);//this.props.index.selected
        if (selected === "yf") {
            this.props.changeState({selected:'yf',key:'api_monitor'})
        } else if (selected === "yw") {
            this.props.changeState({selected:'yw',key:'jvm'})
        } else if (selected === "cp") {
            this.props.changeState({selected:'cp',key:'prod_server_info'})
        }
        //然后默认跳转到对应的 route
        //this.props.history.push("jvm")
    }
    //切换导航栏对应的页面echarts数据
    onChangeMenuPage = () => {
        let key = this.props.index.key;
        let selected = this.props.index.selected;
        let result = this.props.yfReducer.result;
        console.log(`MenuPage: ${key},${selected},${result}`)
        //研发
        let yf = new Map([
            ["api_monitor",<Api cey={key} selected={selected} result={result}/>]
        ]);
        //运维
        let yw = new Map([
            ["jvm",<Jvm cey={key} selected={selected} result={result}/>],
            ["cpu_info",<Cpu cey={key} selected={selected} result={result}/>],
            ["memory_info",<h1>内存信息</h1>],
            ["file_sys",<h1>文件系统信息</h1>],
            ["Throughput",<h1>吞吐量</h1>],
            ["performance",<h1>性能</h1>],
            ["connection",<h1>连接</h1>],
            ["buffer_pool",<h1>缓冲池使用量</h1>],
            ["Traffic_statistics",<h1>流量统计</h1>],
        ])
        //产品
        let cp = new Map([
            ["prod_server_info",<h1>服务器信息</h1>],
            ["prod_hardware_info",<h1>硬盘信息</h1>],
            ["prod_network_updwon",<h1>网络上下行</h1>],
            ["prod_Throughput",<h1>吞吐量</h1>],
            ["prod_access_info",<h1>访问用户信息表</h1>],
            ["prod_not_access_info",<h1>未访问用户信息表</h1>],
            ["prod_web_user_operation",<h1>用户操作日志</h1>],
            ["prod_online_user_info",<h1>在线用户量信息</h1>],
            ["prod_online-user_operation",<h1>用户操作日志</h1>],
            ["prod_mobile_device_info",<h1>移动设备信息</h1>],
            ["prod_page_statistics",<h1>页面统计</h1>],
        ])
        //切换echarts图表的数据结构生成
        let map = new Map([
            ["yf",yf],
            ["yw",yw],
            ["boss",""],
            ["cp",cp],
        ]);
        //遍历map根据不同的selected,key返回对应的echarts图表
        let echarts;
        for(let [key1,value1] of map) {
            console.log(`map1: ${key1},${value1}`)
            if (key1 === selected) {
                for(let [key2,value2] of value1) {
                    console.log(`map2: ${key2},${value2}`)

                    if (key2 === key) {
                        echarts = value2;
                        break;
                    }
                }
                break;
            }
        }
        console.log("echarts: sdasd    " + echarts)
        return (echarts);
    }
    //切换导航栏
    onChangeMenu = () => {
        let selected = this.props.index.selected;
        return (
            selected === 'yf' ? <YfMenu menu={this.menu}/>
            :
            //运维
            selected === 'yw' ? <YwMenu menu={this.menu}/>
                :
                //产品
                selected === 'cp' ? <ProductMenu menu={this.menu}/>
                    : null  
        )
    }
    render() {
        let seleStyle = {
                display: 'block',
                marginLeft: "219px",
                marginTop: "-12px",
                float: 'left'
        }
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
                        width={224}
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    >
                    {/* <br /> */}
                        {this.onChangeMenu()}
                    </Sider>
                    {/********************************导航栏*********************************/}

                    {/********************************body*********************************/}
                    <Content className="content" style={{ color: "white", fontSize: '100px', textAlign: "center" }} >
                        {/* <Switch>
                            <Route path='/api_monitor' component={Api}></Route> 
                            <Route path='/cpu_info' component={Cpu}></Route>         
                            <Route path='/jvm' component={Jvm}></Route> 
                           
                        </Switch> */}
                         {//根据不同下拉选展示不同的导航栏
                            this.onChangeMenuPage(this.props.index.selected,this.props.index.key)
                        }
                    </Content>
                    {/********************************body*********************************/}
                </Layout>
                {/* footer页脚  */}
                <Footer className="footer">
                    Design By SuperMan ?2018 Created by JF
                 </Footer>
            </Layout>
        )
    }
}
