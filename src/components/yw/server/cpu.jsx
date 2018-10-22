import React, { Component } from 'react';
import GaugeChart from "../../../components/bascCharts/gauge-echart";
import _x from "../../../js/_x/index";
import "../../../css/yw/server/cpu.css";

import { ywGetCpu } from '../../../reducers/yw/yw.reducer';
import { connect } from 'react-redux';
@connect(
    state => state.ywReducer,//要哪些状态
    { ywGetCpu }//需要什么动作
)
export default class Cpu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []//
        }
    }
    componentDidMount() {
        //渲染数据
        //this.props.ywGetCpu();
        //请求数据
        this.getCpuData();
        
    }

    getCpuData = () => {
        _x.util.request.request("api/back/monitor_server/cpu",{},(res) => {
            let data = res.data;
            if (data.result) {
                if (data.data && data.length > 0) {
                    //封装数据
                    this.setState({data: data.data})
                }
            }
            console.log(res)
        }).catch((error) => {
            //错误处理
            console.log(error);
            //重置数据，为空
            this.setState({data: []});
        });
    }
    
    render() {
        let style={
            width: 400,
            height: 400,
            margin:'0 auto',
            color: 'white',
            display: "inline-block"
        }
        return (
            <div className="cpu-content">
            {
                this.state.data.length === 0 ? 
                    [1,2,3,4].map((item,index)=> (
                        <GaugeChart style={style} title={`cpu${index}使用率`} value={parseInt(Math.random() * 100)}></GaugeChart>
                    ))
                    :
                    <div>暂无数据</div>
            }
            </div>
        );
    }
}