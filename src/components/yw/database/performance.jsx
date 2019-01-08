import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker} from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import _x from "../../../js/_x/util"

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
            lineDate:[],
            showEchart:false
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
        _x.request.request("api/back/monitor_mysql/performance",searDate,(resp)=>{
            let result=resp.data;
            let xData=[];//横坐标
            let barData=[];//柱状图纵坐标
            let lineDate=[]//折线图纵坐标
            result.forEach(function(value,index,array){
                xData.push(value.schema_name);
                barData.push(value.COUNT);
                lineDate.push(value.avg_microsec);
            });
            this.setState({
                xData,barData,lineDate,
                showEchart:true
            });
        },(e)=>{
            console.error(e);
            alert("服务器异常");
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
                <ReactEcharts option={this.getOption()} opts={{height:'740px'}} 
                style={{marginTop:'80px',display:this.showEchart?'block':"none"}}/>
                <span style={{marginTop:'80px',display:this.showEchart?'none':"block"}}>暂无数据</span>
            </div>
        )
    }
}

//模拟后台返回数据
var resultMap= function(){
    return [
        {
            "schema_name" : "jf_isedc_db_6281_20180621",//数据库名称//
            "COUNT" : parseInt(Math.random() * 10000),//已经执行sql数量//
            "avg_microsec" : parseInt(Math.random() * 10000)//平均每条sql执行耗时//
        }, 
        {
            "schema_name": "jf_information_db_v1.01",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_cloud_db_888888",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_attence_db_v1.01",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_information_db_xh",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_cloud_db_865001200001",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_isgct_v1.0",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_cloud_db_v1.08_865001200001",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_information_xh",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_isedc_db_411101500001",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        },
        {
            "schema_name": "jf_information_db_v1.1",
            "COUNT": parseInt(Math.random() * 10000),
            "avg_microsec": parseInt(Math.random() * 10000)
        }
      ]
} 