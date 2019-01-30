import React, { Component } from 'react';

export default class CommonNoData extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let style = {
            fontSize: this.props.size || 200
        }
        let fontStyle = {
            fontSize: this.props.fontSize || 14
        }
        return (
            <div className="fxh-wrapper">
                <i className="iconfont fxh-no-data-icon" style={{ style }}>&#xe606;</i>
                <span className="fxh-no-data-info" style={{ fontStyle }}>暂无数据!</span>
            </div>
        )
    }

}

