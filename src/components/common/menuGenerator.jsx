import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 使用方式： <MenuGenerator menus={menus} defaultOpenKeys={["api_monitor"]} defaultSelectedKeys={["api_monitor"]}/>
//menus：表示要渲染菜单的数据项，defaultOpenKeys：默认要展开的keys，defaultSelectedKeys：默认选择的keys
const SubMenu = Menu.SubMenu;
export default class MenuGenerator extends Component{

    render() {
        //let key=this.props.key + "/";
        let menus = this.props.menus;
        let defaultOpenKeys = this.props.defaultOpenKeys;
        let defaultSelectedKeys = this.props.defaultSelectedKeys;
        let menu = (
            <div>
                <Menu className="menu" theme="dark" mode="inline"
                    defaultOpenKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                    style={{mixWidth:224}}
                    inlineCollapsed={true}
                    onClick = {this.props.onMenu}>
                    {menus.map( item => {
                        let children1 = item.children;
                        if (children1.length !== 0) {
                            //二级菜单处理
                            return (
                                <SubMenu key={item.key} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
                                    {
                                        children1.map(item2 => {
                                            let children2 = item2.children;
                                            if (children2.length !== 0) {
                                                return (
                                                    <SubMenu key={item2.key} title={<span><Icon type={item2.icon} /><span>{item2.name}</span></span>}>
                                                        {
                                                            children2.map(item3 => {
                                                                //三级菜单
                                                                console.log(item3)
                                                                let children3 = item3.children
                                                                if (children3.length !== 0) {
                                                                    return null;
                                                                    //默认最多只有三级，多个不处理
                                                                } else {
                                                                    return (
                                                                        //三级菜单项
                                                                        <Menu.Item key={item3.key}>
                                                                            {/*文件系统信息*/}
                                                                            {/* <Link to={'/' + item3.key}> */}
                                                                                <Icon type={item3.icon} />
                                                                                <span>{item3.name}</span>
                                                                            {/* </Link> */}
                                                                        </Menu.Item>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </SubMenu>
                                                )
                                            } else {
                                                console.log(item2.key)
                                                return (
                                                    //二级菜单项
                                                    <Menu.Item key={item2.key}>
                                                    {/*文件系统信息*/}
                                                    {/* <Link to={'/' + item2.key}> */}
                                                        <Icon type={item2.icon} />
                                                        <span>{item2.name}</span>
                                                    {/* </Link> */}
                                                    </Menu.Item>
                                                )
                                            }
                                        })
                                    }
                                </SubMenu>
                            )
                        } else {
                            //处理一级菜单,直接返回
                            return (
                                <Menu.Item key={item.key}>
                                    {/* <Link to={'/' + item.key}> */}
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    {/* </Link> */}
                                </Menu.Item>
                            )
                        }
                    })}  
                </Menu>
            </div>
        );
        console.log("menu",menu)
        return (
            menu
        )
    }

}