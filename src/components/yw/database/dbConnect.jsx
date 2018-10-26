import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker,Icon,Button } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

import "../../../css/yw/database/dbConnect.css"

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const TIME_VALUE={
    startTime: moment(new Date()),
    endTime: moment(new Date()).add(-7, "days"),
}
export default class DbConnect extends Component{
    constructor(props){
        super(props);
        this.state = {
           showOption:true,
           isShowDate:true,
           isShowButton:false,
           barYData:[],
           barSeries:[],
           lineTitle:{},
           lineXData:[],
           lineCount:[],
           lineName:{},
           lineColor:{}
        };
    }

    componentDidMount(){
        this.getBarDate();
    }


    //拉取数据
    getBarDate=(startTime,endTime)=>{
        let searhData={};
        if(!startTime || !startTime){
            searhData={
                "startTime":TIME_VALUE.startTime.format("YYYY-MM-DD"),
                "endTime":TIME_VALUE.endTime.format("YYYY-MM-DD")      
            }
        }else{
            searhData={
                "startTime":startTime,
                "endTime":endTime      
            }
        }
        console.log(searhData);
        
        /*********************************************/
    
                        //请求数据

        /**********************************************/
        //成功回调
        let YDate=[];
        let connectedValue=[];
        let runningValue=[];
        let maxValue=[];

        resultData().listConnected.forEach((v,i,arr)=>{
            YDate.push(v.date);
            connectedValue.push(v.count);
        });
        resultData().listRunning.forEach((v,i,arr)=>{
            runningValue.push(v.count);
        });
        resultData().listConnected.forEach((v,i,arr)=>{
            maxValue.push(v.count);
        });

        this.setState({
            barYData:YDate,
            barSeries:[
                {
                    name: '开放连接数',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: connectedValue
                },
                {
                    name: '正在运行连接数',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: runningValue
                },
                {
                    name: '最大连接数',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: maxValue
                }
            ]
        },()=>{
            console.log(this.state)
        });

    }



    //时间选择
    onChange=(date, dateString) =>{
        console.log(dateString);
        this.getBarDate(dateString[0],dateString[1]);
    }



    //柱状图
    getBarOption=()=>{
        let option=option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['开放连接数', '正在运行连接数','最大连接数'],
                textStyle: {
                    color: "#fff"
                } 
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
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
            yAxis: {
                type: 'category',
                data: this.state.barYData,
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
            series: this.state.barSeries
        };
        return option;
    }



    //折线图
    getPieOption=()=>{
        let option = {
            title: {
                text: this.state.lineName,
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:[this.state.lineName],
                textStyle: {
                    color: "#fff"
                } 
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : this.state.lineXData,
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
                }
            ],
            yAxis : [
                {
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
                }
            ],
            series : [
                {
                    name:this.state.lineName,
                    type:'line',
                    stack: '总量',
                    lineStyle:{
                        color:this.state.lineColor
                    },
                    areaStyle: {
                        opacity:0.3,
                        color:this.state.lineColor
                    },
                    data:this.state.lineCount
                }
            ]
        };
        return option;
    }


    //下穿至折线图
    itemOnClick=(param)=>{
        console.log(param);
        let searchData={
            "type":param.seriesIndex+1,
            "date":param.name
        }
         /*********************************************/
    
                        //请求数据

        /**********************************************/
        //成功回调
        let lineXData=[];
        let lineCount=[];
        detailData().forEach((v,x,arr)=>{
            lineXData.push(v.date);
            lineCount.push(v.count);
        });

        this.setState({
            showOption:false,
            isShowDate:false,
            isShowButton:true,
            lineXData:lineXData,
            lineCount:lineCount,
            lineColor:param.color,
            lineName:param.seriesName
        })
    }


    //返回
    goBack=()=>{
        this.setState({
            showOption:true,
            isShowButton:false,
            isShowDate:true
        })
     }





    render(){
        const buttonStyle={
            display:this.state.isShowButton?'block':'none',
            marginLeft: '-120px'
        }
        const dateStyle={
            display:this.state.isShowDate?'block':'none'
        }

        return(
            <div className="dbConnect-content">
                <div className="range-picker"  style={dateStyle}>
                    <span className="date-span">日期：</span>
                    <RangePicker onChange={this.onChange} style={{float:'right'}}/>
                </div>
                
                <div style={{ width: '80%',height: '80%',margin: '60px auto'}}>
                    <Button className="button-style" type="dashed" style={buttonStyle} onClick={this.goBack}>
                        <Icon type="backward" />Go back
                    </Button>
                    <ReactEcharts 
                        option={this.state.showOption ? this.getBarOption() : 
                                            this.getPieOption()}

                        onEvents={{"click":this.itemOnClick}}

                        notMerge={true}

                        style={{height:'100%'}}/>
                                            
                </div>
            </div>                
        )
    }
}

//柱状图
var resultData=function(){
    return {
        "listConnected":[//当前开放连接数
            {"date":"2018-02-03","count":parseInt(Math.random()*100)},
            {"date":"2018-02-04","count":parseInt(Math.random()*100)},
            {"date":"2018-02-05","count":parseInt(Math.random()*100)},
            {"date":"2018-02-06","count":parseInt(Math.random()*100)}
        ],
        "listRunning":[//当前正在运行连接数
            {"date":"2018-02-03","count":parseInt(Math.random()*100)},
            {"date":"2018-02-04","count":parseInt(Math.random()*100)},
            {"date":"2018-02-05","count":parseInt(Math.random()*100)},
            {"date":"2018-02-06","count":parseInt(Math.random()*100)}
        ],
        "listMax":[//数据库最大连接数
            {"date":"2018-02-03","count":parseInt(Math.random()*100)},
            {"date":"2018-02-04","count":parseInt(Math.random()*100)},
            {"date":"2018-02-05","count":parseInt(Math.random()*100)},
            {"date":"2018-02-06","count":parseInt(Math.random()*100)}
        ]
    }
}

//折线图
var detailData=function(){
    return [
        {
          "count": parseInt(Math.random()*10),
          "date": "2018-08-08 09:31:50"
        },
        {
          "count": parseInt(Math.random()*10),
          "date": "2018-08-08 09:51:27"
        },
        {
          "count": parseInt(Math.random()*10),
          "date": "2018-08-08 09:59:31"
        },
        {
          "count": parseInt(Math.random()*10),
          "date": "2018-08-08 10:03:01"
        }
      ]
}