import React from 'react'
import ReactDom from 'react-dom';
import Index from './containers/index/index';
import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';
import {
	Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
	Link
} from 'react-router-dom'
const store = createStore(reducers,
	compose(applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	))

ReactDom.render( 
	(<Provider store={store}>
		<Router>
			<Index/>
		</Router>
	</Provider>),
	document.getElementById("root"));