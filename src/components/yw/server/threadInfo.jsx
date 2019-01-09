import React, { Component } from 'react';
import LineChart from "../../../components/bascCharts/line-echart"
import _x from "../../../js/_x/index";

import "../../../css/yw/server/tcpInfo.css";


const Request = _x.util.request;

export default class ThreadInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "线程占用内存趋势情况",
            xAxis: [],
            yAxis: [], 
            legend: ["cpu使用率","内存使用率"],
        };
    }

    componentDidMount() {
        //获取图表数据
        this.getThreadInfoData();
        
    }

    //获取jvm内存信息
    getThreadInfoData = () => {
        Request.request("api/web/back/monitor_server/thread", {}, (res) => {
            if (res.result) {
                this.setState({
                    jvmTotal: res.data.jvmTotal,
                    jvmUsed: res.data.jvmUsed
                })
            }
        }, (error) => {
            //应该显示暂无数据
            this.setState({
                jvmTotal: 0,
                jvmUsed: 0
            })
        })
        let xAxis= [],yAxis = [],data = [];
        /* "process0" : {
        "pName" : "System Idle Process",//线程名称//
        "pCpu" : "100.0",//cpu使用率//
        "pMem" : "5.882"//内存使用率//
    }, */
        for (let i = 0 ; i < parseInt(Math.random() * 10,10) + 3; i ++) {
            let temp = {
                "pName" : "process" + i,//线程名称//
                "pCpu" : parseInt(Math.random() * 100,10),//cpu使用率//
                "pMem" : parseInt(Math.random(1) * 100,10 )//内存使用率//
            }
            data.push(temp);
        }
        let arr1 = [],arr2 = [];
        for (let item of data) {
            xAxis.push(item.pName);
            arr1.push(item.pCpu);
            arr2.push(item.pMem);
        }
        yAxis.push(arr1,arr2);
        this.setState({xAxis,yAxis});
    }
    render() {
        return (
            <div className="tcp-info-content">
                <div className="tcp-info-content-linechart">
                    {
                        (this.state.xAxis && this.state.xAxis.length > 0) ?
                            <LineChart className="jvm-chart" style={{ width: "80%", height: 600, margin: "0 auto" }}
                                title={this.state.title} legend={this.state.legend} xAxis={this.state.xAxis} yAxis={this.state.yAxis}
                                yFormatter="{value}%" yName="cpu/内存使用率" color={["rgba(0, 102, 255,0.8)","rgba(255, 0, 0,0.7)"]}/>
                            : <div>暂无数据</div>
                    }
                </div>
            </div>
        );
    }
}
