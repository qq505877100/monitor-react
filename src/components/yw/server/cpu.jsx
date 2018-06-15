import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts'
import axios from 'axios';
const url = "http://localhost:8090/assert/test/test";
export default class Cpu extends React.Component {
    componentWillReceiveProps(props){
        console.log('cpu-componentWillReceiveProps',props)
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
        console.log("cpu-componentDidMount", this.props)
        //請求參數
        let data = {
            user: this.props.selected,
            model: this.props.cey
        }
        axios.post(url, data).then(function (response) {
            console.log("cpu-componentDidMount-response",response.data)
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
                        data: response.data
                    }
                ]
            });
        }).catch(function (error) {
            console.log('error----------' + error);
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