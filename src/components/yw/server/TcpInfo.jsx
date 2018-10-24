import React, { Component } from 'react';
import LineChart from "../../../components/bascCharts/line-echart"
import _x from "../../../js/_x/index";

import "../../../css/yw/server/tcpInfo.css";


const Request = _x.util.request;

export default class TcpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "tcp连接信息",
            xAxis: [],
            yAxis: [], 
            legend: ["发送的tcp包","接收的tcp包"],
        };
    }

    componentDidMount() {
        //获取图表数据
        this.getCupInfoData();
        
    }

    //获取jvm内存信息
    getCupInfoData = () => {
        Request.request("api/web/back/monitor_server/tcp", {}, (res) => {
            console.log(res);
            if (res.result) {
                this.setState({
                    jvmTotal: res.data.jvmTotal,
                    jvmUsed: res.data.jvmUsed
                })
            }
        }, (error) => {
            //应该显示暂无数据
            this.setState({
                jvmTotal: 0,
                jvmUsed: 0
            })
        })
        let xAxis= [],yAxis = [];
        let data = {
            listSend: [
                {date:"2018-02-03 16:38:40",count:23},
                {date:"2018-02-03 16:38:45",count:24},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:45",count:20},
                {date:"2018-02-03 16:38:50",count:35},
                {date:"2018-02-03 16:38:45",count:24},
                {date:"2018-02-03 16:38:50",count:29},
                {date:"2018-02-03 16:38:55",count:26}
            ],
            listReceived: [
                {date:"2018-02-03 16:38:40",count:34},
                {date:"2018-02-03 16:38:45",count:31},
                {date:"2018-02-03 16:38:50",count:36},
                {date:"2018-02-03 16:38:45",count:19},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:45",count:28},
                {date:"2018-02-03 16:38:50",count:25},
                {date:"2018-02-03 16:38:55",count:37}
            ]
        }
        let tem = []
        for (let item of data.listSend) {
            xAxis.push(item.date);
            tem.push(item.count)
        }
        yAxis.push(tem);
        tem = []
        for (let item of data.listReceived) {
            tem.push(item.count)
        }
        yAxis.push(tem);
        this.setState({xAxis,yAxis});
    }
    render() {
        return (
            <div className="tcp-info-content">
                <div className="tcp-info-content-linechart">
                    {
                        (this.state.xAxis && this.state.xAxis.length > 0) ?
                            <LineChart className="jvm-chart" style={{ width: "80%", height: 600, margin: "0 auto" }}
                                title={this.state.title} legend={this.state.legend} xAxis={this.state.xAxis} yAxis={this.state.yAxis}
                                />
                            : <div>暂无数据</div>
                    }
                </div>
            </div>
        );
    }
}
