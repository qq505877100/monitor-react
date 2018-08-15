import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts'
import { ywGetCpu } from '../../../reducers/yw/yw.reducer';
import { connect } from 'react-redux';
@connect(
    state => state.ywReducer,//要哪些状态
    { ywGetCpu }//需要什么动作
)
export default class Cpu extends Component {
    componentWillReceiveProps(props){
        // console.log('cpu-componentWillReceiveProps',props)
        var myChart = echarts.init(document.getElementById('cpu'),'dark');
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
                    detail: {
                        formatter:()=>{
                        props.result.forEach(element => {
                            return element.value+'%'
                        });
                    },
                    color:'red'    
                    },
                    data: props.result
                }
            ]
        });
    }

    componentDidMount() {
        //渲染数据
        this.props.ywGetCpu();
    }
    render() {
        let style={
            width: 800,
            height: 800 ,
            margin:'0 auto',
            color: 'white'
        }
        return (
            <div>
                <div id="cpu" style={style}></div>
            </div>
        );
    }
}