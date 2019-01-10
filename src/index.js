import React from 'react'
import ReactDom from 'react-dom';
import Index from './containers/index/index';
import { _x } from './js/index';
import G from './js/g';
import { getBaseinfo } from './../src/js/g';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';
import {
	Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {
	BrowserRouter as Router,
	// Route,
	// Redirect,
	// Switch,
	// Link
} from 'react-router-dom';

import "./css/base.css"
/* 引入图标库 */
import "./css/icon/iconfont.css"

//store设置
const store = createStore(reducers,
	compose(applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	))

const setConfig = _x.util.request.setConfig;

getBaseinfo();//获取基础信息，动态获取后台地址等
setConfig(G.baseinfo.serviceroot); //设置axios

export default class App extends React.Component {
	render () {
		return (<LocaleProvider locale={zh_CN}>
				<Provider store={store}>
					<Router>
						<Index/>
					</Router>
				</Provider>
			</LocaleProvider>)
	}
	

}
ReactDom.render(  <App/>,document.getElementById("root"));
