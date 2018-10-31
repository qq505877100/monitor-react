import React, { Component } from 'react';
import LineChart from "../../../components/bascCharts/line-echart";
import ReactEcharts from 'echarts-for-react';

import _x from "../../../js/_x/index";

import "../../../css/yw/server/tcpInfo.css";


const Request = _x.util.request;

export default class TcpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "tcp连接信息",
            xAxis: [],
            yAxis: [], 
            legend: ["发送的tcp包","接收的tcp包"],
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
        let xAxis= [],yAxis = [];
        let data = {
            listSend: [
                {date:"2018-02-03 16:38:40",count:23},
                {date:"2018-02-03 16:38:45",count:24},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:45",count:20},
                {date:"2018-02-03 16:38:50",count:35},
                {date:"2018-02-03 16:38:45",count:24},
                {date:"2018-02-03 16:38:50",count:29},
                {date:"2018-02-03 16:38:55",count:26}
            ],
            listReceived: [
                {date:"2018-02-03 16:38:40",count:34},
                {date:"2018-02-03 16:38:45",count:31},
                {date:"2018-02-03 16:38:50",count:36},
                {date:"2018-02-03 16:38:45",count:19},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:45",count:28},
                {date:"2018-02-03 16:38:50",count:25},
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
        this.setState({xAxis,yAxis});
    }

    getOption = () => {
        let option = {
            title: {
                text: this.state.title,
                left: "center",
                top: 10,
                textStyle: {
                    color: "#fff",
                    fontSize: 20
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                // orient: "vertical",
                data:this.state.legend,
                top: 16,
                right: "25%",
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
                data: this.state.xAxis,
                boundaryGap: true,
                axisLabel: {
                    rotate: 45,
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
                    name: "发送/接收包数量",
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        formatter: this.props.yFormatter || '{value}',
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
                    name: this.state.legend[0],
                    type: 'line',
                    stack: "总量",
                    color: "green",
                    areaStyle: {color: "green",opacity: 0.6},
                    data: this.state.yAxis[0]
                },
                {
                    name: this.state.legend[1],
                    type: 'line',
                    stack: "总量",
                    color: "orange",
                    areaStyle: {color: "orange",opacity: 0.8},
                    data: this.state.yAxis[1]
                }
            ]
        };
        return option;
    }
    // <ReactEcharts style={{ width: "80%", height: 600, margin: "0 auto" }} option={this.getOption()}></ReactEcharts>
    render() {
        return (
            <div className="tcp-info-content">
                <div className="tcp-info-content-linechart">
                    {
                        (this.state.xAxis && this.state.xAxis.length > 0) ?
                             <LineChart className="jvm-chart" style={{ width: "80%", height: 600, margin: "0 auto" }}
                                    title={this.state.title} legend={this.state.legend} xAxis={this.state.xAxis} yAxis={this.state.yAxis}
                                    yName="发送/接收包数量" color={["green","red"]}/>
                            : <div>暂无数据</div>
                    }
                </div>
            </div>
        );
    }
}
