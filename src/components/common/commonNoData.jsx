import React, { Component } from 'react';

export default class CommonNoData extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>图标无数据!</h1>
            </div>
        )
    }

}

