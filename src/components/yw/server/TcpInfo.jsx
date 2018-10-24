import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _x from "../../../js/_x/index";

import "../../../css/yw/server/tcpInfo.css";


const Request = _x.util.request;

export default class TcpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: [],
            yAxis: [], 
            title: ["发送的tcp包","接收的tcp包"],
        };
    }

    componentDidMount() {
        //获取图表数据
        this.getCupInfoData();
        
    }

    //获取jvm内存信息
    getCupInfoData = () => {
        Request.request("api/web/back/monitor_server/tcp", {}, (res) => {
            console.log(res);
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
       
       /*  "listSend":{
            {"date":"2018-02-03 16:38:40","count":23},
            {"date":"2018-02-03 16:38:45","count":23},
            {"date":"2018-02-03 16:38:50","count":23},
            {"date":"2018-02-03 16:38:55","count":23}//数据集合，list//
            }, */
            let title=[],xAxis= [],yAxis = [];
        let data = {
            listSend: [
                {date:"2018-02-03 16:38:40",count:23},
                {date:"2018-02-03 16:38:45",count:24},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:55",count:26}
            ],
            listReceived: [
                {date:"2018-02-03 16:38:40",count:34},
                {date:"2018-02-03 16:38:45",count:35},
                {date:"2018-02-03 16:38:50",count:36},
                {date:"2018-02-03 16:38:55",count:37}
            ]
        }
        let tem = []
        for (let item of data.listSend) {
            xAxis.push(item.date);
            tem.push(item.count)
        }
        yAxis.push(tem);
        tem = []
        for (let item of data.listReceived) {
            tem.push(item.count)
        }
        yAxis.push(tem);
        console.log(xAxis);
        console.log(yAxis);

        this.setState({xAxis,yAxis});


    }

    //设置饼图option选项信息
    getOption = () => {
        let option = {
            title: {
                text: 'tcp连接信息',
                left: "center",
                top: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                orient: "vertical",
                data:this.state.title,
                top: 10,
                right: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.xAxis,
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: this.state.title[0],
                    type: 'line',
                    // stack: '总量',
                    // areaStyle: {},
                    data: this.state.yAxis[0]
                },
                {
                    name: this.state.title[1],
                    type: 'line',
                    /* stack: '总量',
                    areaStyle: {}, */
                    data: this.state.yAxis[1]
                },
            ]
        };
        return option;
    }
    render() {
        return (
            <div className="tcp-info-content">
                <div className="tcp-info-content-linechart">
                    {
                        (this.state.xAxis && this.state.xAxis.length > 0) ?
                            <ReactEcharts className="jvm-chart" style={{ width: 900, height: 600, margin: "0 auto" }}
                                option={this.getOption()} />
                            : <div>暂无数据</div>
                    }
                </div>
            </div>
        );
    }
}
