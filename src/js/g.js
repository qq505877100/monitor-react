/*
 * @Author: lxx 
 * @Date: 2018-08-27 22:14:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-22 13:04:11
 */
/**
 * 全局变量
 */
const G = {
    defaultServerUrl: "http://localhost:8091/cloud",
    title: "课堂生态",
    dataServices: "",
    rootPath: '',
    /**
     * 用户信息
     */
    baseinfo: {

    },
    isdebug: true,
    loaded: false,
}

/**
 * 获取基础数据(获取地址)
 */
export function getBaseinfo() {
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
        G.dataServices = G.dedefaultServerUrl;
    }
    console.log(G)
}

if (window) {
    window.G = G;
}
export default G;