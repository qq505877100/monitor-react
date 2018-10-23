import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _x from "../../../js/_x/index";


import { ywGetJvm } from '../../../reducers/yw/yw.reducer';
import { connect } from 'react-redux';

import "../../../css/yw/server/jvm.css";

const Request = _x.util.request;

@connect(
    state => state.ywReducer,//要哪些状态
    { ywGetJvm }//需要什么动作
)
export default class FileSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            jvmUsed: 4000, //使用的jvm内存
            jvmTotal: 10000 //总大小
        };
    }

    componentDidMount() {
        //获取图表数据
        // this.getJvmData();

        //請求參數 //this.props.ywGetJvm();
        // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('jvm'));
        // 绘制图表

    }

    //获取jvm内存信息
    getJvmData = () => {
        Request.request("api/back/monitor_server/jvm", {}, (res) => {
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
    }

    //设置饼图option选项信息
    getOption = () => {
        let option = {
            title: {
                text: '文件系统历史信息',
                left: "center",
                top: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告'],
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    },
                    formatter: (params) => {
                        let xAxis = [];
                        for (let j = 0; j < Math.floor(params.length / 5); j++) {
                            xAxis.push(params.slice(j * 5, (j + 1) * 5))
                        }
                        if ((params.length % 5) > 0) {
                            xAxis.push(params.slice(Math.floor(params.length / 5) * 5))
                        }
                        xAxis = xAxis.join('\n');
                        return xAxis;
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
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },

            ]
        };
        return option;
    }
    render() {
        return (
            <div className="jvm-content">
                {
                    this.state.jvmTotal ?
                        <ReactEcharts className="jvm-chart" style={{ width: 900, height: 600, margin: "0 auto" }}
                            option={this.getOption()} />
                        : <div>暂无数据</div>
                }
            </div>
        );
    }
}
