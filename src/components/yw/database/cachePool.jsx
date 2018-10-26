import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker,Icon,Button } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';


import "../../../css/yw/database/cachePool.css"
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


export default class CachePool extends Component{

    constructor(props){
        super(props);
        this.state={
            topXData:[],
            bottomXData:[],
            topValue:[],
            bottomValue:[]
        }
    }



    componentDidMount(){
        this.getData();
    }



    //拉取数据
    getData=(dataTime)=>{
        let searchParam={}
        if(!dataTime){
            searchParam={
                "date":moment(new Date()).format("YYYY-MM-DD")
            }
        }else{
            searchParam={
                "date":dataTime
            }
        }
        console.log(searchParam)
         /******************************************/

                    //请求数据

        /******************************************/
        //请求成功的回调
        let  topXData=[];
        let bottomXData=[];
        let topValue=[];
        let bottomValue=[]
        resultMap.listUseRate.forEach((v,i,arr)=>{
            topXData.push(v.date);
            topValue.push(v.count);
        });
        resultMap.listUseRate.forEach((v,i,arr)=>{
            bottomXData.push(v.date);
            bottomValue.push(v.count);
        });

        this.setState({
            topXData,bottomXData,topValue,bottomValue
        });
    }



    //渲染图表
    getOption=()=>{
        let option = {
            title: {
                text: '缓冲池使用率与命中率',
                x: 'center',
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data:['使用率','命中率'],
                x: 'left',
                textStyle: {
                    color: "#fff"
                } 
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {}
                }
            },
            axisPointer: {
                link: {xAxisIndex: 'all'}
            },
            grid: [{
                left: 50,
                right: 50,
                height: '35%'
            }, {
                left: 50,
                right: 50,
                top: '55%',
                height: '35%'
            }],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: this.state.topXData,
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                    
                },
                {
                    gridIndex: 1,
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data:this.state.bottomXData,
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    },
                    position: 'top'
                }
            ],
            yAxis : [
                {
                    name : '使用率',
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: false,
                        type: 'dashed'
                    }
                },
                {
                    gridIndex: 1,
                    name : '命中率',
                    type : 'value',
                    inverse: true,
                    axisLine: {
                        lineStyle: {
                            color: '#FFFFFF',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: false,
                        type: 'dashed'
                    }
                }
            ],
            series : [
                {
                    name:'使用率',
                    type:'line',
                    symbolSize: 8,
                    smooth: true,
                    hoverAnimation: false,
                    data:this.state.topValue
                },
                {
                    name:'命中率',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    hoverAnimation: false,
                    data: this.state.bottomValue
                }
            ]
        };
        return option;
    }



    //日期变换
    onChange=(date, dateString) =>{
        console.log(dateString);
        this.getData(dateString);
    }



    render(){
        return (
            <div>
                <div className="choose-date">
                    <span className="date-span">日期选择：</span>
                    <DatePicker onChange={this.onChange} style={{float:'right'}}/>
                </div>
                <div style={{ width: '80%',height: '80%',margin: '60px auto'}}>
                    <ReactEcharts option={this.getOption()} opts={{height:'740px'}} style={{marginTop:'80px'}}/>
                </div>
            </div>
        )
    }
}


var resultMap={
    "listUseRate": [
        {
          "count": "0.3",
          "date": "2018-08-08 09:31:50"
        },
        {
          "count": "0.36",
          "date": "2018-08-08 09:51:27"
        },
        {
          "count": "0.36",
          "date": "2018-08-08 09:59:31"
        },
        {
          "count": "0.36",
          "date": "2018-08-08 10:03:01"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:11:34"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:11:59"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:12:29"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:14:29"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:14:59"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:15:29"
        },
        {
          "count": "0.38",
          "date": "2018-08-08 13:15:59"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:18:45"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:19:14"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:19:44"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:20:14"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:20:44"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:21:21"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:21:44"
        },
        {
          "count": "0.39",
          "date": "2018-08-08 16:22:19"
        }
      ],
      "listHitRate": [
        {
          "count": "1",
          "date": "2018-08-08 09:31:50"
        },
        {
          "count": "1",
          "date": "2018-08-08 09:51:27"
        },
        {
          "count": "1",
          "date": "2018-08-08 09:59:31"
        },
        {
          "count": "1",
          "date": "2018-08-08 10:03:01"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:11:34"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:11:59"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:12:29"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:14:29"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:14:59"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:15:29"
        },
        {
          "count": "1",
          "date": "2018-08-08 13:15:59"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:18:45"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:19:14"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:19:44"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:20:14"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:20:44"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:21:21"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:21:44"
        },
        {
          "count": "1",
          "date": "2018-08-08 16:22:19"
        }
      ]
}