import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker} from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

import "../../../css/yw/database/performance.css"

const TIME_VALUE={
   time: moment(new Date())
}
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Performance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            xData:[],
            barData:[],
            lineDate:[]
        };
    }


    componentDidMount(){
        this.getData();
    }



    //查询
    getData=(dateStr)=>{
        let searDate={};
        if(!dateStr){
            searDate={
                date:TIME_VALUE.time.format('YYYY-MM-DD')
            }
        }else{
            searDate={
                date:dateStr
            }
        }
        console.log(searDate)
        /******************************************/

                    //请求数据

        /******************************************/
        //请求成功的回调
        let xData=[];//横坐标
        let barData=[];//柱状图纵坐标
        let lineDate=[]//折线图纵坐标
        resultMap.forEach(function(value,index,array){
            xData.push(value.schema_name);
            barData.push(value.COUNT);
            lineDate.push(value.avg_microsec);
        });
        this.setState({
            xData,barData,lineDate
        });
    }



    //渲染echart
    getOption=()=>{
        let option={
            title: {
                text: '数据库性能',
                textStyle: {
                    color: "#fff"
                },
                left:'center',
            },
            grid: {  
                left: '10%',  
                bottom:'35%'  
                }, 
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    // dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['已执行SQL数量','平均SQL执行耗时'],
                textStyle: {
                    color: "#fff"
                },
                right:250,
                top:5  
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.xData,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        },
                        interval:0,  
                        rotate:40  
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '已执行SQL数量',
                    
                    min: 0,
                    // max: 250,
                    // interval: 50,
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false,
                        type:'dashed'
                    }
                },
                {
                    type: 'value',
                    name: '平均SQL执行耗时',
                    min: 0,
                    // max: 25,
                    // interval: 50,
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        formatter: '{value}ms',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false,
                        type:'dashed'
                    }
                }
            ],
            series: [
                {
                    name:'已执行SQL数量',
                    type:'bar',
                    data:this.state.barData
                },
                {
                    name:'平均SQL执行耗时',
                    type:'line',
                    yAxisIndex: 1,
                    data:this.state.lineDate,
                    itemStyle: {
                        normal: {
                          color: "#ADFF2F",
                          lineStyle: {
                          color: "#ADFF2F"
                         }
                       }
                    }
                }
            ]
        };
        return option;
    }


    //时间选择
    onChange=(date, dateString) =>{
        this.getData(dateString);
    }

    render(){
        return(
            <div style={{marginTop:'110px'}}>
                <div className="choose-date">
                    <span className="date-span">日期选择：</span>
                    <DatePicker onChange={this.onChange} style={{float:'right'}}/>
                </div>
                <ReactEcharts option={this.getOption()} opts={{height:'740px'}} style={{marginTop:'80px'}}/>
            </div>
        )
    }
}

//模拟后台返回数据
var resultMap= [
        {
            "schema_name" : "jf_isedc_db_6281_20180621",//数据库名称//
            "COUNT" : "5188",//已经执行sql数量//
            "avg_microsec" : "2830"//平均每条sql执行耗时//
        }, 
        {
            "schema_name": "jf_information_db_v1.01",
            "COUNT": "9333",
            "avg_microsec": "6002"
        },
        {
            "schema_name": "jf_cloud_db_888888",
            "COUNT": "9643",
            "avg_microsec": "2239"
        },
        {
            "schema_name": "jf_attence_db_v1.01",
            "COUNT": "7845",
            "avg_microsec": "3682"
        },
        {
            "schema_name": "jf_information_db_xh",
            "COUNT": "3859",
            "avg_microsec": "1179"
        },
        {
            "schema_name": "jf_cloud_db_865001200001",
            "COUNT": "930",
            "avg_microsec": "1298"
        },
        {
            "schema_name": "jf_isgct_v1.0",
            "COUNT": "737",
            "avg_microsec": "1008"
        },
        {
            "schema_name": "jf_cloud_db_v1.08_865001200001",
            "COUNT": "1047",
            "avg_microsec": "7803"
        },
        {
            "schema_name": "jf_information_xh",
            "COUNT": "926",
            "avg_microsec": "7352"
        },
        {
            "schema_name": "jf_isedc_db_411101500001",
            "COUNT": "1665",
            "avg_microsec": "6493"
        },
        {
            "schema_name": "jf_information_db_v1.1",
            "COUNT": "3666",
            "avg_microsec": "3621"
        }
      ]