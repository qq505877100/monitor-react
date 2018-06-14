import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts'
export default class Cpu extends React.Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('cpu'),'dark');
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'cpu信息' ,
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '使用率',
                    type: 'gauge',
                    detail: {formatter:'50%'},
                    data: [{value: 50}]
                }
            ]
        });
    }
    render() {
        let style={
            width: 800,
            height: 800 ,
            margin:'0 auto',
            color: 'white'
        }
        return (
            <div id="cpu" style={style}></div>
        );
    }
}