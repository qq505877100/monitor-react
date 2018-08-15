import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
//import { pie, tooltip, title } from 'echarts'

import { ywGetJvm } from '../../../reducers/yw/yw.reducer';
import { connect } from 'react-redux';

@connect(
    state => state.ywReducer,//要哪些状态
    { ywGetJvm }//需要什么动作
)
export default class Jvm extends Component {
    //侧边栏点击修改props渲染数据prpos.result后台获取的数据
    componentWillReceiveProps(props) {
        console.log('jvm-componentWillReceiveProps', props)
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('jvm'));
        // 绘制图表
        myChart.setOption({
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
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: 'jvm使用情况',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: props.result,
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        });
    }

    componentDidMount() {
        console.log("jvm-componentDidMount", this.props)
        //請求參數
        this.props.ywGetJvm();
    }
    render() {
        return (
            <div id="jvm" style={{ width: 800, height: 800, margin: 'auto' }}></div>
        );
    }
}
