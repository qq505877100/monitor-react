import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker,Modal } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

import "../../../css/yw/database/dataQuota.css"

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const TIME_VALUE={
    startTime: moment(new Date()),
    endTime: moment(new Date()).add(-7, "days"),
}
export default class DataQuota extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            barXData:[],
            barSeries:[],
            lineXData:[],
            lineSeries:[],
            titleName:''
        };
    }


    componentDidMount(){
        this.getBarData();
    }



    //柱状图数据获取
    getBarData=(startTime,endTime)=>{
        let searchData={};
        if(!startTime || !endTime){
            searchData={
                startTime:TIME_VALUE.startTime.format("YYYY-MM-DD"),
                endTime:TIME_VALUE.endTime.format("YYYY-MM-DD")
            }
        }else{
            searchData={
                startTime,endTime
            }
        }
        console.log(searchData);
        /*********************************************/
    
                        //请求数据

        /**********************************************/
        //成功回调
        let resultData=resultBarMap();

        let sentValue=[];
        let receivedVlaue=[];
        let XData=[];
        resultData.listSent.forEach((v,i,arr)=>{
            sentValue.push(v.count);
            XData.push(v.date);
        });
        resultData.listReceived.forEach((v,i,arr)=>{
            receivedVlaue.push(v.count);
        })
        this.setState({
            barXData:XData,
            barSeries:[
                {
                    "name": "发送的流量",
                    "type": "bar",
                    "data": sentValue,
                    "barWidth": "auto",
                    "itemStyle": {
                      "normal": {
                        "color": {
                          "type": "linear",
                          "x": 0,
                          "y": 0,
                          "x2": 0,
                          "y2": 1,
                          "colorStops": [
                            {
                              "offset": 0,
                              "color": "rgba(144, 238 ,144, 0.5)"
                            },
                            {
                              "offset": 0.5,
                              "color": "rgba(0,133,245,0.7)"
                            },
                            {
                              "offset": 1,
                              "color": "rgba(0,133,245,0.3)"
                            }
                          ],
                          "globalCoord": false
                        }
                      }
                    }
                  },
                {
                    "name": "接收的流量",
                    "type": "bar",
                    "data": receivedVlaue,
                    "barWidth": "auto",
                    "itemStyle": {
                      "normal": {
                        "color": {
                          "type": "linear",
                          "x": 0,
                          "y": 0,
                          "x2": 0,
                          "y2": 1,
                          "colorStops": [
                            {
                              "offset": 0,
                              "color": "rgba(255,37,117,0.7)"
                            },
                            {
                              "offset": 0.5,
                              "color": "rgba(0,255,252,0.7)"
                            },
                            {
                              "offset": 1,
                              "color": "rgba(0,255,252,0.3)"
                            }
                          ],
                          "globalCoord": false
                        }
                      }
                    },
                    "barGap": "0"
                  }
            ]
        },()=>{
            console.log(this.state);
        });
    }



    //渲染柱状图
    getBarOption=()=>{
        let option = {
            title: {
                "text": "流量统计",
                "left": "center",
                "y": "10",
                "textStyle": {
                  "color": "#fff"
                }
              },
            "legend": {
                "data": [
                  {
                    "name": "发送的流量",
                    "icon": "circle",
                    "textStyle": {
                      "color": "#fff"
                    }
                  },
                  {
                    "name": "接收的流量",
                    "icon": "circle",
                    "textStyle": {
                      "color": "#fff"
                    }
                  }
                ],
                "top": "10%",
                "textStyle": {
                  "color": "#fff"
                }
              },
            "xAxis": [
                {
                  "type": "category",
                  "data":this.state.barXData,
                  "axisPointer": {
                    "type": "shadow"
                  },
                  axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                  },
                  "axisLabel": {
                    "show": true,
                    "textStyle": {
                      "color": "#white"
                    }
                  }
                }
              ],

            "yAxis": [
                {
                  "type": "value",
                  "name": "发送的流量",
                  "nameTextStyle": {
                    "color": "#FFFFFF"
                  },
                  "interval": 10,
                  "axisLabel": {
                    "show": true,
                    "textStyle": {
                      "color": "#FFFFFF"
                    }
                  },
                  "axisLine": {
                    "show": true,
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                  },
                  "splitLine": {
                    "lineStyle": {
                      "color": "#7d838b",
                        type: 'dashed'    
                    }
                  }
                }
                
              ],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  crossStyle: {
                    color: "#384757"
                  }
                }
              },
              "grid": {
                "top": "20%"
              },
            series:this.state.barSeries
        };
        return option;        
    }


    //下穿弹框
    itemOnClick=(param)=>{
        console.log(param);

        let searchParam={//请求参数
            date:param.name,
            type:param.seriesIndex+1
        }
        console.log(searchParam)
        /*********************************************/
    
                        //请求数据

        /**********************************************/
        //成功回调
        let resultdataLine=reultLineMap();

        let XData=[];
        let value=[];
        resultdataLine.forEach((v,i,arr)=>{
            XData.push(v.date);
            value.push(v.count);
        });

        this.setState({
            visible: true,
            lineXData:XData,
            titleName:param.seriesName,
            lineSeries:[
                {
                    name:param.seriesName,
                    type:'line',
                    stack: '总量',
                    data:value,
                    // lineStyle:{
                    //     color:param.color
                    // },
                    // areaStyle: {
                    //     opacity:0.3,
                    //     color:param.color
                    // },
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(82, 191, 255, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(82, 191, 255, 0)'
                            }], false),
                            shadowColor: 'rgba(228, 139, 76, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    symbolSize:4,  
                    itemStyle: {
                        normal: {
                            color: 'rgb(82, 191, 255)',
                            borderColor:'#e48b4c'
                        },
                    },
                }
            ]
        })
    }


    //渲染折现图
    getLineOption=()=>{
        let option = {
            title: {
                text: this.state.titleName,
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
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
            yAxis: {
                type: 'value',
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
                    type: 'dashed'
                }
            },
            series: this.state.lineSeries
        };
        return option;        
    }


    //时间选择
    onChange=(date, dateString) =>{
        console.log(dateString);
        this.getBarData(dateString[0],dateString[1]);
    }


    //关闭折线图弹框
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

      
    render(){
        return(
            <div >
                <Modal
                    title={this.state.titleName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width='900px'
                     >       
                    <ReactEcharts 
                        option={ this.getLineOption()} 
                        opts={{width:800,height:600}}/>
                </Modal>
                <div className="range-picker" >
                    <span className="date-span">日期：</span>
                    <RangePicker onChange={this.onChange} style={{float:'right'}}/>
                </div>
                <div style={{ width: '80%',height: '80%',margin: '60px auto'}}>
                    <ReactEcharts onEvents={{"click":this.itemOnClick}}
                     option={this.getBarOption()}
                     opts={{height:'740px'}}/>
                </div>
            </div>
        )
    }
} 

var resultBarMap =function(){
    return {
        "listSent":[//发送的流量，list集合//
            {"date":"2018-02-03","count":parseInt(Math.random()*100)},
            {"date":"2018-02-04","count":parseInt(Math.random()*100)},
            {"date":"2018-02-05","count":parseInt(Math.random()*100)},
            {"date":"2018-02-06","count":parseInt(Math.random()*100)},
            {"date":"2018-02-07","count":parseInt(Math.random()*100)},
            {"date":"2018-02-08","count":parseInt(Math.random()*100)},
            {"date":"2018-02-09","count":parseInt(Math.random()*100)},
            {"date":"2018-02-10","count":parseInt(Math.random()*100)}
        ],
        "listReceived":[//接收的流量，list集合//
            {"date":"2018-02-03","count":parseInt(Math.random()*100)},
            {"date":"2018-02-04","count":parseInt(Math.random()*100)},
            {"date":"2018-02-05","count":parseInt(Math.random()*100)},
            {"date":"2018-02-06","count":parseInt(Math.random()*100)},
            {"date":"2018-02-07","count":parseInt(Math.random()*100)},
            {"date":"2018-02-08","count":parseInt(Math.random()*100)},
            {"date":"2018-02-09","count":parseInt(Math.random()*100)},
            {"date":"2018-02-10","count":parseInt(Math.random()*100)}
        ]
    }
}

var reultLineMap=function(){
    return [//数据集合，list//
        {"date":"2018-02-03 16:38:40","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:38:45","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:38:50","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:38:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:38:57","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:39:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:40:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:41:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:42:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:43:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:44:55","count":parseInt(Math.random()*100)},
        {"date":"2018-02-03 16:45:55","count":parseInt(Math.random()*100)}


    ]
}