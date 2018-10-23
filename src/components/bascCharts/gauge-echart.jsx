
import React,{Component} from "react";
import ReactEcharts from 'echarts-for-react';

export default class GaugeChart extends Component {

    /**
     * 
     * title: 仪表盘的标题
     * value: cpu的使用率
     * @memberof GaugeChart
     */
    getOption = () => {
        let option = {
            title: {
                show: false,
                text: this.props.title ,
                left: 'center',
                top: 10,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: this.props.title,
                    type: 'gauge',
                    title: {
                        color: "white"
                    },
                    detail: {
                        formatter : "{value}%",
                    },
                    data: [{name: this.props.title,value: this.props.value}]
                }
            ]
        };
        return option;
    }

    render() {
        return <ReactEcharts style={this.props.style} option={this.getOption()}></ReactEcharts>
    }
}