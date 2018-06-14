import React,{Component} from 'react'
import Logo from '../../components/logo/logo'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

export default class Login extends Component {
    constructor(){
        super()
        this.state = {count:0}
        this.register = this.register.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    register() {
        //跳转到注册页面
        this.props.history.push("/register")
    }
    handleLogin() {
        this.setState({count: this.state.count+1})
        let type = this.state.count % 2 == 1 ? "boss" : "genius";//genius
        if (type == "boss") {
            //跳转boss完善页面
            this.props.history.push("/bossinfo")
        } else if ( type == "genius"){
            //跳转genius完善页面
            this.props.history.push("/geniusinfo")
        }

    }
    handleChange(key,value) {
        this.setState({
            [key]: value
        })
    }
    render() {
        return (
            
            <div>
                {/*{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}*/}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>: null}
                    <List>
                        <InputItem onChange={v=>this.handleChange("user",v)}>用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={v=>this.handleChange("pwd",v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}