import React, { Component } from 'react';
import "../../css/common/noData.css";

export default class ChartNoData extends Component {
   

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        let style = this.props.style;
        style = {fontSize: 200}
        return (
            <div className="fxh-wrapper">
                <i className="iconfont fxh-no-data-icon" style={{style}}>&#xe629;</i>
                <span className="fxh-no-data-info">暂无图标数据!</span>
            </div>
        )
    }

}