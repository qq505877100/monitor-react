import React,{Component} from "react";
import ReactEcharts from 'echarts-for-react';

export default class PieChart extends Component {

    /**
     * 
     * title: 饼图标题
     * data : 饼图数据结构
     * value: cpu的使用率
     * @memberof GaugeChart
     */
   //设置饼图option选项信息
   getOption = () => {
    let option = {
        title: {
            text: this.props.title || "",
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff',
                fontSize: 20
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: this.props.title,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                startAngle: 90,
                clockwise: false,
                minAngle: 8,
                data: this.props.data,
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.6)'
                        }
                    }
                },
                itemStyle: {
                    color: (params) => {
                        if (params.dataIndex === 0) {
                            return "orange"
                        } else {
                            return "#37a2da";
                        }
                    }
                }
            }
        ]
    }
    return option;
}

    render() {
        return <ReactEcharts style={this.props.style} option={this.getOption()}></ReactEcharts>
    }
}