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
export default class Jvm extends Component {
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
        Request.request("api/back/monitor_server/jvm",{},(res) => {
            console.log(res);
            if (res.result) {
                this.setState({jvmTotal: res.data.jvmTotal,
                    jvmUsed: res.data.jvmUsed})
            }
        },(error) => {
            //应该显示暂无数据
            this.setState({jvmTotal: 0,
                jvmUsed: 0})
        })
    }

    //设置饼图option选项信息
    getOption = () => {
        let option = {
            title: {
                text: 'jvm使用情况',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: 'jvm使用情况',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    startAngle: 90,
                    clockwise: false,
                    data: [{name:"已使用内存",value: this.state.jvmUsed},
                        {name: "剩余内存",value: this.state.jvmTotal - this.state.jvmUsed}],
                    // roseType: 'area',
                    label: {
                        normal: {
                            formatter: '{b}：{c}({d}%)',
                            fontSize: 16,
                            color: "#fff",
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.6)',
                            }
                        }
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'orange' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'blue' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div className="jvm-content">
                {
                    this.state.jvmTotal ? 
                        <ReactEcharts className="jvm-chart" style={{width: 800,height: 800,margin:"0 auto"}}
                        option={this.getOption()}/>
                        : <div>暂无数据</div>
                }
            </div>
        );
    }
}
