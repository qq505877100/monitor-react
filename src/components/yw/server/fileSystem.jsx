import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _x from "../../../js/_x/index";

import "../../../css/yw/server/fileSystem.css";

const Request = _x.util.request;

export default class FileSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: [],
            yAxis: [], 
            title: [],
        };
    }

    componentDidMount() {
        //获取图表数据
        this.getFileSystemData();

        //請求參數 //this.props.ywGetJvm();
        // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('jvm'));
        // 绘制图表
        

    }

    //获取jvm内存信息
    getFileSystemData = () => {
        Request.request("api/back/monitor_server/disk", {}, (res) => {
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
        /* {"date":"2018-02-05","diskUsed":90679496},
        {"date":"2018-02-06","diskUsed":90679496}}, */
        let data = [{
            name: "磁盘1使用情况",
            data: [{date: "2018-10-13",diskUsed: 3000},{date: "2018-10-14",diskUsed: 3100},{date: "2018-10-15",diskUsed: 3500},
            {date: "2018-10-16",diskUsed: 2500},{date: "2018-10-17",diskUsed: 2800}]
        },{
            name: "磁盘2使用情况",
            data: [{date: "2018-10-13",diskUsed: 2000},{date: "2018-10-14",diskUsed: 2100},{date: "2018-10-15",diskUsed: 2100},
            {date: "2018-10-16",diskUsed: 2100},{date: "2018-10-17",diskUsed: 2100}]
        }]
        let xAxis = [],yAxis=[],title = [],flag = true;
        for (let item of data) {
            title.push(item.name);
            let tem = []
            for (let data of item.data) {
                if (flag) {
                    //xAxis
                    xAxis.push(data.date);
                }
                tem.push(data.diskUsed);
            }
            yAxis.push(tem);
            flag = false;
        }
        this.setState({xAxis,yAxis,title})


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
                /* axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                } */
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
            <div className="file-sys-content">
                <div className="file-sys-content-linechart">
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
