/*
 * @Author: lxx 
 * @Date: 2018-08-27 22:14:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-22 11:26:19
 */
/**
 * 全局变量
 */
const G = {
    // defaultServerUrl: "http://10.10.1.142:8080/cloud/",
    defaultServerUrl: "http://10.10.1.204:8080/cloud",
    title: "课堂生态",
    dataServices: "",
    rootPath: '',
    /**
     * 用户信息
     */
    baseinfo: {

    },
    isdebug: false,
    loaded: false,
}

const debug = process.env.NODE_ENV === "development"
// console.log(debug)
/**
 * 获取基础数据(获取地址)
 */
export function getBaseinfo() {
    if (debug) {
        G.isdebug = true;
    }
    //解析出根地址(部署到服务器后，需要解析真实的后台地址)
    G.rootpath = window.location.href.substring(0, window.location.href.indexOf('/index'));
    if (G.rootpath) {
        //走线上地址
        G.baseinfo = {
            // serviceroot: G.isdebug ? 'http://10.10.1.5:8080/cloud' : G.rootpath,
            serviceroot: G.isdebug ? G.defaultServerUrl : G.rootpath
        };
        G.dataServices = G.baseinfo.serviceroot;
    } else {
        //走默认地址
        G.baseinfo = {
            serviceroot: G.defaultServerUrl
        };
        G.dataServices = G.baseinfo.serviceroot;
    }
}

if (window) {
    window.G = G;
}
export default G;