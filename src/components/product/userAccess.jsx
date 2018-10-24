import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _x from "../../js/_x/index";
import moment from "moment";
import { Input, Modal, DatePicker, Table } from 'antd';


import "../../css/product/userAccess.css"
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;
const DEFAULT_VALUE = {
    date: moment(new Date()),
    startTime: moment(new Date()),
    endTime: moment(new Date()).add(-7, "days"), 
}
export default class UserAccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logShow: false,//是否显示日志记录弹框
            data: {
                totalNumber: 0,//总人数
                activationNumber: 0, //总注册人数
                totalAccess: 0, //访问人数
                averageDuration: "", //平均访问时长
                startDate: "", //开始时间
                endDate: "",//结束时间
                accessStatus: [] //图表数据
            },
            type: 0,//0,1 分别表示：web、app
            selectType: 0,//0 1 2 分别表示按日，按月，按范围
            date: null,//日 月选择时的日期 默认当天的数据
            startTime: null,//范围选择的开始时间
            endTime: null,//结束时间
            keywords: "",//查询关键字
            isAccess: 1,//true/false 访问/未访问的标识
            selectTime: null, //用户在图表上选中的时间
            dataSource: [], //列表的数据
            detailDataSource: [], //弹出层列表数据集
            pageIndex: 1,
            pageSize: 10,
            detailPageIndex: 1,
            detailpageSize: 10
        }
    }

    //初始化数据
    componentDidMount() {
        this.searchLoginStatisticsInfo(true);
    }
    //设置是否显示日志弹框
    setModalShow = (flag) => {
        this.setState({ logShow: flag });
    }

    //改变统计查询条件的回调函数
    onChangeParams = (obj) => {
        if (obj.hasOwnProperty("type")) {
            //初始化数据
            obj.selectType = 0;
            this.searchLoginStatisticsInfo(true);
        } else {
            //设置默认日期
            switch (obj.selectType) {
                case 0:
                    obj.date = DEFAULT_VALUE.date.format("YYYY-MM-DD");
                    break;
                case 1:
                    obj.date = DEFAULT_VALUE.date.format("YYYY-MM");
                    break;
                case 2:
                    obj.startTime = DEFAULT_VALUE.startTime.format("YYYY-MM-DD");
                    obj.endTime = DEFAULT_VALUE.endTime.format("YYYY-MM-DD");
                    break;
                default:
                    obj.date = DEFAULT_VALUE.date.format("YYYY-MM-DD");
                    break;
            }
            let params = {
                type: this.state.type,
                selectType: obj.selectType,
                date: obj.date,
                startTime: obj.startTime,
                endTime: obj.endTime
            }
            this.searchLoginStatisticsInfo(false, params);
        }
        this.setState(obj);
    }

    //切换访问/未访问按钮的回调
    onChangeLoginInfoParams(params) {
        let paramsObj = {
            startTime: this.state.selectTime,
            isAccess: params.isAccess,
            keywords: this.state.keywords,
        }

        this.setState(params, () => {
            this.searchLoginInfo(false)
        });
    }
    //搜索框内容变化-设置
    onChangeInputVaule = (e) => {
        this.setState({
            keywords: e.target.value
        })
    }

    //点击搜索框、回车查询用户访问情况
    search = (value) => {
        this.searchLoginInfo(false)
    }

    //用户鼠标悬浮到图表上-回调
    itemOnClick = (params) => {
        let isAccess = params.seriesIndex; //未访问 / 访问 判断
        let date = params.name; //选中的日期
        let paramsObj = {
            startTime: date,
            isAccess,
            keywords: this.state.keywords
        }
        console.log(params);
        this.setState({ selectTime: date, isAccess }, () => {
            //查询数据
            this.searchLoginInfo(false, paramsObj)
        })
    }

    /**根据条件查询用户登录的统计信息
     * flag: true/false 是否初始化操作
     * params: 查询参数 
     */
    searchLoginStatisticsInfo = (flag, params) => {
        if (flag) {
            //初始化时候的查询
            params = {
                type: 0,
                selectType: 0,
                date: _x.util.date.format(new Date(), "yyyy-MM-dd"),
            }
        } else {
            params = {
                type: this.state.type,
                selectType: this.state.selectType,
                date: this.state.date,
                startTime: this.state.startTime,
                endTime: this.state.endTime
            }
        }
        let response = {
            totalNumber: parseInt(Math.random() * 100) + 300,
            activationNumber: parseInt(Math.random() * 100) + 200,
            totalAccess: parseInt(Math.random() * 100) + 100,
            averageDuration: "00:10:10",
            startDate: "",
            endDate: "",
            accessStatus: this.genarateDate()
        };
        //设置响应数据和默认的selectTime值
        this.setState({ data: response, selectTime: response.accessStatus.xArr[0] }, () => {
            //同时获取 访问用户的列表数据
            this.searchLoginInfo(true, response);
        });

    }

    //查询某一时间段的所有用户访问信息
    searchLoginInfo = (flag, params) => {
        if (flag) {
            //初始化参数
            params = {
                type: this.state.type,
                selectType: this.state.selectType,
                startTime: this.state.data.accessStatus.xArr[0],
                endTime: "",
                isAccess: 1,
                text: "",
            }
        } else {
            params = {
                type: this.state.type,
                selectType: this.state.selectType,
                startTime: this.state.selectTime,
                endTime: null,
                isAccess: this.state.isAccess,
                text: this.state.keywords
            }
        }
        console.log(`用户访问表格查询条件:`);
        console.log(params);
        //角色，姓名，登录时间 在线时长
        let dataSource = [];
        for (let index = 0; index < Number.parseInt(Math.random() * 100); index++) {
            dataSource.push({
                key: index + Math.random(), accName: "accName" + index, trueName: "trueName" + index,
                roleName: "roleName" + index, roleLevel: "roleLevel" + index,
                logTime: "logTime" + index,
                onLineTime: "onLineTime" + index
            });
        }
        this.setState({ dataSource})
        // TODO 到后台查询参数
    }

    //查询具体某个人的访问记录信息
    searchLoginInfoDetail = (record) => {
        let params = {
            type: this.state.type, //类型 0表示web端、1表示app端//
            startTime: 1525562522,//开始时间//
            endTime: 2656255652,//结束时间// 
            accName: record.accName//用户账号//
        };
        //后台查询数据（先造假数据）
        /* 	"accName": "050000026000540511",//账号
	"pageName": "sdjfka",//页面名称  trueName
       "interviewTime":5445134,//访问时间
    "logTime": 4455666//访问时长 */
        let dataSource = [];
        for (let index = 0; index < Number.parseInt(Math.random() * 100); index++) {
            dataSource.push({
                key: index + Math.random(), accName: "accName" + index, trueName: "trueName" + index,
                pageName: "pageName" + index, interviewTime: "interviewTime" + index,
                logTime: "logTime" + index,
                onLineTime: "onLineTime" + index
            });
        }
        this.setState({detailDataSource: dataSource});

    }

    showModelData = () => {

    }

    //时间控件改变时的回调
    onChangeDate = (date, dateString, startTime, endTime) => {
        if (this.state.selectType === 2) {
            this.setState({ startTime: dateString[0], endTime: dateString[1] })
        } else {
            this.setState({ date: dateString })
        }
        let params = {
            type: this.state.type,
            selectType: this.state.selectType,
            date: typeof (dateString) === "string" ? dateString : "",
            startTime: typeof (dateString) !== "string" ? dateString[0] : "",
            endTime: typeof (dateString) !== "string" ? dateString[1] : "",
        }
        //查询数据
        this.searchLoginStatisticsInfo(false, params);
    }

    //分页点击的回调
    //用户访问表格-点击用户访问表格页数时，页数改变时的回调
    onChangeAccess = (page, pageSize) => {
        this.setState({pageIndex: page});
        //向后台请求数据 请求低page页，每页显示条数为pageSize
    }

    //弹框用户访问表格-点击弹框用户访问表格页数时，页数改变时的回调
    onChangeDetail = (page, pageSize) => {
        this.setState({detailPageIndex: page});
        //向后台请求数据 请求低page页，每页显示条数为pageSize
    }

    //用户访问表格-改变每页显示条数的回调
    onShowSizeChange = (current, pageSize) => {
        console.log("用户访问表格");
        console.log(current);
        console.log(pageSize);
        this.setState({pageSize: pageSize});
        //向后台请求数据 请求第1页，每页显示条数为pageSize

    }
    //弹框用户访问表格-改变每页显示条数的回调
    onShowSizeChangeDetail = (current, pageSize) => {
        console.log("弹框用户访问表格");
        console.log(current); 
        console.log(pageSize);
        this.setState({detailpageSize: pageSize});
        //向后台请求数据 请求第1页，每页显示条数为pageSize
    }

    genarateDate = () => {
        let data = { xArr: [], yArr: [], yArr2: [] };
        let date = new Date();
        date.setDate(parseInt(Math.random() * 30));
        for (let index = 0; index < parseInt(Math.random() * 10) + 4; index++) {
            date.setDate(date.getDate() + 1);
            let format = _x.util.date.format(date, "yyyy-MM-dd");
            data.xArr.push(format);
            let count = parseInt(Math.random() * 200) + 50;
            data.yArr.push(count);
            data.yArr2.push(count - parseInt(Math.random() * 40));

        }
        return data;
    }
    //图表的option
    getOption = () => {
        let option = {
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                show: true,
                trigger: 'axis',
                enterable: true,
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
            },
            legend: {
                show: true,
                top: "top",
                right: "auto",
                textStyle: {
                    color: 'white'
                },
                data: ["在线人数", "未在线人数"]
            },
            grid: {
                top: 30,
            },
            xAxis: {
                type: 'category',
                //data: [this.props.xAxis],
                data: this.state.data.accessStatus.xArr,
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    },
                    formatter: (params) => {
                        let xAxis = [];
                        for (let j = 0; j < Math.floor(params.length / 5); j++) {
                            xAxis.push(params.slice(j * 5, (j + 1) * 5))
                        }
                        if ((params.length % 5) > 0) {
                            xAxis.push(params.slice(Math.floor(params.length / 5) * 5))
                        }
                        xAxis = xAxis.join('\n');
                        return xAxis;
                    }
                },
                // axisLabel: {}
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                nameRotate: 45,
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: this.props.max ? '{value}%' : '{value}'
                }
            },
            series: [{
                name: "未在线人数",
                data: this.state.data.accessStatus.yArr2,
                // data: this.props.data,
                type: 'line',
                itemStyle: {
                    color: this.props.color || 'green',
                },
            }, {
                name: "在线人数",
                data: this.state.data.accessStatus.yArr,
                type: "line",
                itemStyle: {
                    color: this.props.color || 'orange',
                },
            }
            ]
        };

        return option;
    }

    render() {
        // console.log(this.state);
        let onEvents = {
            "mouseover": this.itemOnClick
        }
        const columns = [{
            title: '账号',
            dataIndex: 'accName',
            width: 90,
            key: "accName"
        },
        {
            title: '姓名',
            dataIndex: 'trueName',
            width: 90,
            key: "trueName"
        }, {
            title: '角色',
            dataIndex: 'roleName',
            width: 90,
            key: "roleName"
        }, {
            title: '角色级别',
            dataIndex: 'roleLevel',
            width: 90,
            key: "roleLevel"
        }, {
            title: '登录时间',
            dataIndex: 'logTime',
            width: 90,
            key: "logTime"
        },{
            title: '在线时长',
            dataIndex: 'onLineTime',
            width: 90,
            key: "onLineTime"
        }];
        const detailColumns = [{
            title: '账号',
            dataIndex: 'accName',
            width: 90,
            key: "accName"
        },{
            title: '姓名',
            dataIndex: 'trueName',
            width: 90,
            key: "trueName"
        }, {
            title: '访问页面',
            dataIndex: 'pageName',
            width: 90,
            key: "pageName"
        }, {
            title: '访问时间',
            dataIndex: 'interviewTime',
            width: 90,
            key: "interviewTime"
        },{
            title: '访问时长',
            dataIndex: 'logTime',
            width: 90,
            key: "logTime"
        }];
        
        return (
            <div className="fxh-product-container">
                {/* 用户访问信息总表 */}
                <div className="fxh-product-header">
                    {/* 搜索框 */}
                    <div className="fxh-header-search" >
                        <div className="fxh-left">
                            <span className={this.state.type === 0 ? "select-style" : ""} onClick={this.onChangeParams.bind(this, { type: 0 })}>web</span>
                            <span className={this.state.type === 1 ? "select-style" : ""} onClick={this.onChangeParams.bind(this, { type: 1 })}>app</span>
                        </div>
                        <div className="fxh-right">
                            <span className="time">
                                <span>日期：&nbsp;</span>
                                <span className="date-select">
                                    {/* <DatePicker className="dataPicker" size={"default"} /> */}
                                    {this.state.selectType === 0 ? <DatePicker onChange={this.onChangeDate} size={"default"} defaultValue={DEFAULT_VALUE.date} /> :
                                        (this.state.selectType === 1 ? <MonthPicker onChange={this.onChangeDate} placeholder="请选择月份" defaultValue={DEFAULT_VALUE.date} /> :
                                            <RangePicker size={"default"} onChange={this.onChangeDate} defaultValue={[DEFAULT_VALUE.startTime, DEFAULT_VALUE.endTime]} />)
                                    }
                                </span>
                            </span>
                            <span onClick={this.onChangeParams.bind(this, { selectType: 2 })} className={this.state.selectType === 2 ? "select-style" : ""}>范围查询</span>
                            <span onClick={this.onChangeParams.bind(this, { selectType: 1 })} className={this.state.selectType === 1 ? "select-style" : ""}>按月查询</span>
                            <span onClick={this.onChangeParams.bind(this, { selectType: 0 })} className={this.state.selectType === 0 ? "select-style" : ""}>按日查询</span>
                        </div>
                        <div style={{ clear: "both" }}></div>
                    </div>
                    {/* 统计信息 */}
                    <div className="fxh-header-content">
                        <div className="fxh-header-statistics">

                            <div>
                                <span>用户总量</span>
                                <span>{this.state.data.totalNumber}</span>
                            </div>
                            <div>
                                <span>用户激活数</span>
                                <span>{this.state.data.activationNumber}</span>
                            </div>
                            <div>
                                <span>访问总数</span>
                                <span>{this.state.data.totalAccess}</span>
                            </div>
                            <div>
                                <span>平均访问时长</span>
                                <span>{this.state.data.averageDuration}</span>
                            </div>
                        </div>


                        {/* 统计图表 */}
                        <div className="fxh-header-chart">
                            <ReactEcharts onEvents={onEvents} 
                                style={{ width: '950px', height: '300px', margin: "0 auto" }} 
                                option={this.getOption()} />
                        </div>
                    </div>

                </div>
                {/* 用户访问信息/未访问 模块展示 */}
                <div className="fxh-product-content">
                    {/* 标题 */}
                    <div className="content-header">
                        <span className="title">{this.state.selectTime}用户访问情况</span>
                    </div>
                    {/* 搜索框 切换按钮 */}
                    <div className="content-search">
                        <div className="content-search-box">
                            <div className="content-search-left">
                                {/* <Input placeholder="用户姓名" onPressEnter={this.search} onChange={this.onChangeInputVaule}
                                    style={{ width: "140px", float: "left" }} defaultValue={this.state.keywords}/>
                                <Button onClick={this.search}> 
                                <Icon onClick={this.search} type="search" theme="outlined"
                                    style={{ fontSize: "16px", position: "absolute", right: "5px;", top: "20px", right: "8px", color: "black" }} /> */}
                                <Search
                                    placeholder="用户姓名"
                                    onChange={this.onChangeInputVaule}
                                    onSearch={this.search}
                                    style={{ width: 200, float: "left" }}
                                />
                            </div>
                            <div className="content-search-switch">
                                <span className={this.state.isAccess === 0 ? "select-user" : ""} onClick={this.onChangeLoginInfoParams.bind(this, { isAccess: 0 })}>未访问用户</span>
                                <span className={this.state.isAccess === 1 ? "select-user" : ""} onClick={this.onChangeLoginInfoParams.bind(this, { isAccess: 1 })}>访问用户</span>
                            </div>
                        </div>

                    </div>
                    {/* 表格展示 */}
                    <div className="content-data">
                        <Table dataSource={this.state.dataSource} columns={columns} 
                            pagination = {{
                                onChange: this.onChangeAccess,
                                showSizeChanger: true,
                                pageSizeOptions: ["10","20","30"],
                                onShowSizeChange: this.onShowSizeChange,
                                showTotal:(total, range) => `共 ${total} 条记录`,
                                total: this.state.dataSource.length
                            }}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        //显示弹框
                                        this.setState({ logShow: true });
                                        //获取数据
                                        this.searchLoginInfoDetail(record);
                                    }
                                };
                            }}
                            className="table" />
                    </div>
                </div>
                {/* 用户操作日志弹框 */}
                <Modal
                    title="xxx用户操作日志"
                    width="900px"
                    centered
                    footer={null}
                    visible={this.state.logShow}
                    onOk={() => this.setModalShow(false)}
                    onCancel={() => this.setModalShow(false)}
                >
                    <div className="table">
                        <Table dataSource={this.state.detailDataSource} columns={detailColumns}
                            pagination = {{
                                onChange: this.onChangeDetail,
                                showSizeChanger: true,
                                pageSizeOptions: ["5","10","15"],
                                onShowSizeChange: this.onShowSizeChangeDetail,
                                showTotal:(total, range) => `共 ${total} 条记录`,
                                total: this.state.detailDataSource.length
                            }}
                            className="table" />
                    </div>
                </Modal>
            </div>
        )
    }
}