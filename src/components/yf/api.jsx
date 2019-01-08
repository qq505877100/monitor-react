import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts';
import { getNum } from '@/reducers/yf/yf.reducer'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react';
@connect(
    state => state.yfReducer,//要哪些状态
    { getNum }//需要什么动作
)
export default class Api extends Component {

    getOption = () => {
        let option = {
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
                
            },
            grid: {
                top: 30,
            },
            xAxis: {
                type: 'category',
                //data: [this.props.xAxis],
                data: ['马克思列宁主义毛泽东思想基本理论','dasdasd'],
                axisLabel: {
                    textStyle: {
                        color: '#fff'
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
                // axisLabel: {}
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                nameRotate: 45,
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: this.props.max ? '{value}%' : '{value}'
                }
            },
            series: [{
                data:[2,4],
                // data: this.props.data,
                type: 'bar',
                itemStyle: {
                    color: this.props.color || '#d37f2d',
                },
                barWidth: 40,
            }]
        };

        return option;
    }

    //侧边栏点击修改props渲染数据
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps", props)
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('api'), 'dark');
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts' },
            tooltip: {},
            xAxis: {
                 //data: Object.keys(props.result)
                data: ["08-01","08-02","08-03"]
            },
            yAxis: {},
            series: [{
                name: '测试',
                type: 'bar',
                //data: Object.values(props.result)
                data: [2,3,4,5]
            }]
        });
    }

    //组件加载完毕去请求数据
    componentDidMount() {
        //this.props.getNum();
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('api'), 'dark');
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts' },
            tooltip: {},
            xAxis: {
                 //data: Object.keys(props.result)
                data: ["08-01","08-02","08-03"]
            },
            yAxis: {},
            series: [{
                name: '测试',
                type: 'bar',
                //data: Object.values(props.result)
                data: [2,3,4]
            }]
        });
    }
    render() {
        let style = {
            width: 800,
            height: 800,
            margin: '0 auto',
        }

        return (
            <div>
                {/* <div>
                    <ReactEcharts style={{ width: '400px', height: '291px',margin:"0 auto" }} option={this.getOption()}/>
                </div> */}
                <div id="api" style={style}></div>
            </div>
        )
    }
}
