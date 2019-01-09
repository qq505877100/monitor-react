import React, { Component } from 'react';
import PieChart from "../../../components/bascCharts/pie-echart";
import _x from "../../../js/_x/index";
import "../../../css/yw/server/memoryInfo.css";

export default class MemoryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []//
        }
        console.log("constructor")
    }
    componentDidMount() {
        //渲染数据
        //this.props.ywGetCpu();
        //请求数据
        this.getMemoryData();
        console.log("componentDidMount")

        
    }

    getMemoryData = () => {
        // data：{
        //     "memTotal" : 407957,
        //        "memUsed" : 3659716,
        //        "swapTotal" : 8157284,
        //        "swapUsed" : 4853316
        //    }
        _x.util.request.request("api/back/monitor_server/mem",{},(data) => {
            if (data.result) {
                if (data.data && data.length > 0) {
                    //封装数据
                    let dataPie = [{
                        title: "内存使用情况",
                        data: [{name: "已使用内存",value: data.data.memUsed},{name: "剩余内存",value: data.data.memTotal - data.data.memUsed}]
                    },{
                        title: "交换机使用情况",
                        data: [{name: "已使用内存",value: data.data.swapUsed},{name: "剩余内存",value: data.data.swapTotal - data.data.swapUsed}]

                    }];
                    this.setState({data: dataPie})
                }
            }
        }).catch((error) => {
            //错误处理
            console.log(error);
            //重置数据，为空
            //this.setState({data: []});
        });

        // 静态数据
        let num = parseInt(Math.random() * 100);
        let num2 = parseInt(Math.random() * 100);

        let dataPie = [{
            title: "内存使用情况",
            data: [{name: "已使用内存",value: num},{name: "剩余内存",value: 100 - num}]
        },{
            title: "交换机使用情况",
            data: [{name: "已使用内存",value: num2},{name: "剩余内存",value: 100 - num2}]

        }];
        this.setState({data: dataPie})
    }
    
    render() {
        let style={
            width: 500,
            height: 500,
            margin:'0 auto',
            display: "inline-block"
        }
        return (
            <div className="memory-content">
                <div className="memory-peichart">
                    {
                        (this.state.data.length && this.state.data.length > 0) ? 
                            this.state.data.map((item,index)=> (
                                <PieChart key={index} style={style} title={item.title} data={item.data}></PieChart>
                            ))
                            :
                            <div>暂无数据</div>
                    }
                </div>
            </div>
        );
    }
}