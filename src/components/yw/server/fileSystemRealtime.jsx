import React, { Component } from 'react';
import PieChart from "../../../components/bascCharts/pie-echart";
import _x from "../../../js/_x/index";
import "../../../css/yw/server/fileSystemRealtime.css"

export default class MemoryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pieData: []//
        }
        console.log("constructor")
    }
    componentDidMount() {
        //渲染数据
        //this.props.ywGetCpu();
        //请求数据
        this.getSystemRealtimeData();
    }

    getSystemRealtimeData = () => {

        _x.util.request.request("api/back/monitor_server/mem", {}, (res) => {
            let data = res.data;
            if (data.result) {
                if (data.data && data.length > 0) {
                    //封装数据
                    let dataPie = [{
                        title: "内存使用情况",
                        data: [{ name: "已使用内存", value: data.data.memUsed }, { name: "剩余内存", value: data.data.memTotal - data.data.memUsed }]
                    }, {
                        title: "交换机使用情况",
                        data: [{ name: "已使用内存", value: data.data.swapUsed }, { name: "剩余内存", value: data.data.swapTotal - data.data.swapUsed }]

                    }];
                    this.setState({ data: dataPie })
                }
            }
            console.log(res);
        }).catch((error) => {
            //错误处理
            console.log(error);
            //重置数据，为空
            //this.setState({data: []});
        });

        // 静态数据
        let pieData = { diskList: [] };

        for (let i = 0; i < parseInt(Math.random() * 10); i++) {
            let num = Number.parseInt(Math.random() * 100);
            let obj = {
                diskName: "磁盘" + i + "使用情况",
                data: [{ name: "已使用大小", value: num }, { name: "剩余大小", value: 100 - num }]
            }
            pieData.diskList.push(obj);
        }
        this.setState({ pieData: pieData.diskList });
    }

    render() {
        let style = {
            width: 400,
            height: 400,
            margin: '0 auto',
            display: "inline-block"
        }
        return (
            <div className="realtime-content">
                <div className="realtime-content-piechart">
                    {
                        (this.state.pieData && this.state.pieData.length > 0) ?
                            this.state.pieData.map((item, index) => (
                                <PieChart key={index} style={style} title={item.diskName} data={item.data}></PieChart>
                            ))
                            :
                            <div>暂无数据</div>
                    }
                </div>

            </div>
        );
    }
}