import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { DatePicker,Icon,Button } from 'antd';
import ReactEcharts from 'echarts-for-react';

import "../../../css/yw/database/throughput.css"
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


export default class Throughput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            xData:[],
            series:[],
            isShow:false
        };
    }
    
   
    componentDidMount(){
        this.init();
    }


    //初始化渲染
    init(){
        /*********************************************/
        
                         //请求数据

         /**********************************************/

         let arr=[];//设置横坐标
         let qusValue=[];//吞吐量数据数据
         let selectValue=[];//查询量数据
         let insertValue=[];//插入量数据
         let deleteValue=[];//删除量数据
         let updateValue=[];//更新量数据
 
         result.listQus.forEach(function(value,index,array){
             arr.push(value.date);
             qusValue.push(value.count);
         });
 
         result.listSelect.forEach(function(value,index,array){
             selectValue.push(value.count);
         });
 
         result.listInsert.forEach(function(value,index,array){
             insertValue.push(value.count);
         });
 
         result.listDelete.forEach(function(value,index,array){
             deleteValue.push(value.count);
         });
 
         result.listUpdate.forEach(function(value,index,array){
             updateValue.push(value.count);
         });
 
 
         this.setState({
             xData:arr,
             data:['吞吐量数据','查询数量','插入语句数量','删除数量','更新数量'],
             series:[
                 {
                     name:'吞吐量数据',
                     type:'line',
                     stack: '总量',
                     data:qusValue
                 },
                 {
                     name:'查询数量',
                     type:'line',
                     stack: '总量',
                     data:selectValue
                 },
                 {
                     name:'插入语句数量',
                     type:'line',
                     stack: '总量',
                     data:insertValue
                 },
                 {
                     name:'删除数量',
                     type:'line',
                     stack: '总量',
                     data:deleteValue
                 },
                 {
                     name:'更新数量',
                     type:'line',
                     stack: '总量',
                     data:updateValue
                 }
             ]
         })
    }


    //点击下穿到具体时间
    itemOnClick=(param)=>{
        console.log(param);
        let type=param.seriesIndex;//请求类型
        let date=param.name;//时间(天)


        let arr=[];//横坐标
        let count=[];//数据
        dateilResult.forEach(function(value,index,array){
            arr.push(value.date);
            count.push(value.count)
        });

        
        //设置数据
        let typeName=type==0?['吞吐量数据']:type==1?['查询数量']:type==2?['插入语句数量']:type==3?['删除数量']:['更新数量']
        this.setState({
            isShow:true,
            data:typeName,
            xData:arr,
            series:[
                {
                    name:'吞吐量数据',
                    type:'line',
                    stack: '总量',
                    data:'吞吐量数据'==typeName[0]?count:[]
                },
                {
                    name:'查询数量',
                    type:'line',
                    stack: '总量',
                    data:'查询数量'==typeName[0]?count:[]
                },
                {
                    name:'插入语句数量',
                    type:'line',
                    stack: '总量',
                    data:'插入语句数量'==typeName[0]?count:[]
                },
                {
                    name:'删除数量',
                    type:'line',
                    stack: '总量',
                    data:'删除数量'==typeName[0]?count:[]
                },
                {
                    name:'更新数量',
                    type:'line',
                    stack: '总量',
                    data:'更新数量'==typeName[0]?count:[]
                }
            ]
        },()=>{
            console.log(this.state)
        })
       
       
    }

    //设置echart
    getOption = () => {
        let option = {
            title: {
                text: '吞吐量',
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:this.state.data,
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
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.xData,
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
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: this.state.series
        };
        return option;
    }


    //返回goBack
    goBack=()=>{
       this.init();
       this.setState({
           isShow:false
       })
    }



    render(){
        const style={
            display:this.state.isShow?'block':'none'
        }
        return (
        <div className="throughput-content">
            <Button className="button-style" type="dashed" style={style} onClick={this.goBack}>
                <Icon type="backward" />Go back
            </Button>
            <ReactEcharts style={{marginTop:'80px'}} option={this.getOption()} opts={{height:600}} 
            onEvents={{"click":this.itemOnClick}}/>
        </div>
        )
    }
}







//模拟后台返回参数
var result={//初始化数据
    //吞吐量数据
    "listQus":[
        {"date":"2018-02-03","count":parseInt(Math.random()*100)},
        {"date":"2018-02-04","count":parseInt(Math.random()*100)},
        {"date":"2018-02-05","count":parseInt(Math.random()*100)},
        {"date":"2018-02-06","count":parseInt(Math.random()*100)}
            ],
    //数据库已经执行的查询数量
    "listSelect":[
        {"date":"2018-02-03","count":parseInt(Math.random()*100)},
        {"date":"2018-02-04","count":parseInt(Math.random()*100)},
        {"date":"2018-02-05","count":parseInt(Math.random()*100)},
        {"date":"2018-02-06","count":parseInt(Math.random()*100)}
    ],
    //数据库已经执行插入语句数量
    "listInsert":[
        {"date":"2018-02-03","count":parseInt(Math.random()*100)},
        {"date":"2018-02-04","count":parseInt(Math.random()*100)},
        {"date":"2018-02-05","count":parseInt(Math.random()*100)},
        {"date":"2018-02-06","count":parseInt(Math.random()*100)}
    ],
    //删除数量
    "listDelete":[
        {"date":"2018-02-03","count":parseInt(Math.random()*100)},
        {"date":"2018-02-04","count":parseInt(Math.random()*100)},
        {"date":"2018-02-05","count":parseInt(Math.random()*100)},
        {"date":"2018-02-06","count":parseInt(Math.random()*100)}
    ],
    //更新数量
    "listUpdate":[
        {"date":"2018-02-03","count":parseInt(Math.random()*100)},
        {"date":"2018-02-04","count":parseInt(Math.random()*100)},
        {"date":"2018-02-05","count":parseInt(Math.random()*100)},
        {"date":"2018-02-06","count":parseInt(Math.random()*100)}
    ]
}


var dateilResult=[//数据详情
    {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:56:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:56:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:57:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:57:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:58:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:58:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:59:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 08:59:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:00:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:00:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:01:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:01:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:02:06"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:02:36"
      },
      {
        "count": parseInt(Math.random()*100),
        "date": "2018-08-01 09:03:06"
      }
]