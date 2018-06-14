import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts';
import axios from 'axios';

const url = "http://192.168.51.199:8090/assert/test/test";

export default class Api extends React.Component {
    constructor(props) {
        console.log("constructor",props)
        super(props);
    }

    //侧边栏点击修改props渲染数据
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps",props)
        var myChart = echarts.init(document.getElementById('api'), 'dark');
        myChart.setOption({
            title: { text: 'ECharts' },
            tooltip: {},
            xAxis: {
                data: Object.keys(props.result)
            },
            yAxis: {},
            series: [{
                name: '测试',
                type: 'bar',
                data: Object.values(props.result)
            }]
        });
    }

    //组件加载完毕去请求数据
    componentDidMount() {
        console.log("componentDidMount", this.props)
        //請求參數
        let data = {
            user: this.props.selected,
            model: this.props.cey
        }
        let that = this;
        axios.post(url, data)
            .then(function (response) {
                console.log(response.data)
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('api'), 'dark');
                // 绘制图表
                myChart.setOption({
                    title: { text: 'ECharts' },
                    tooltip: {},
                    xAxis: {
                        data: Object.keys(response.data)
                    },
                    yAxis: {},
                    series: [{
                        name: '测试',
                        type: 'bar',
                        data: Object.values(response.data)
                    }]
                });
            })
            .catch(function (error) {
                console.log('error----------' + error);
            });

    }
    render() {
        let style = {
            width: 800,
            height: 800,
            margin: '0 auto',
        }

        return (
            <div id="api" style={style}></div>)

    }
}
