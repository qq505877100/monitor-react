import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts';
import { getNum } from '../../reducers/yf/yf.reducer'
import { connect } from 'react-redux'

@connect(
    state => state.yfReducer,//要哪些状态
    { getNum }//需要什么动作
)
export default class Api extends Component {

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
                 data: Object.keys(props.result)
                //data: [2,3,4]
            },
            yAxis: {},
            series: [{
                name: '测试',
                type: 'bar',
                data: Object.values(props.result)
                //data: [2,3,4,5]
            }]
        });
    }

    //组件加载完毕去请求数据
    componentDidMount() {
        this.props.getNum()
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
