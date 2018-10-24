import React,{Component} from "react";
import ReactEcharts from 'echarts-for-react';

export default class LineChart extends Component {

    constructor(props) {
        super(props);
    }
    //设置饼图option选项信息
    /**
     *  title: 图表标题信息
     *  xAxis:[] ,x轴坐标数组
     *  legend:["",""] 图例/系列名称
     *  yAxis: [[],[]} y轴的数数数组
     *  yFormatter: "{value}" 是否对y轴的刻度格式化
     *  yName: 指定y轴的坐标名称
     */
    getOption = () => {
        let series = [];
        for (let i = 0; i < this.props.legend.length; i ++) {
            let item = {
                name: this.props.legend[i],
                type: 'line',
                data: this.props.yAxis[i]
            }
            series.push(item);
        }

        let option = {
            title: {
                text: this.props.title,
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
                data:this.props.legend,
                top: 10,
                right: "5%",
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
                data: this.props.xAxis,
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
                    name: this.props.yName || "",
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
            series: series
        };
        return option;
    }
    render() {
        return <ReactEcharts style={this.props.style} option={this.getOption()}></ReactEcharts>
    }
}
