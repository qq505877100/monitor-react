import axios from 'axios';
let axiosIns;
//初始化axios实例
function initAxiosIns() {
    axiosIns = axios.create({
        baseURL: 'http://192.168.51.195:8090/monitor',
        timeout: 10000,
        // withCredentials : true
      });
    axiosIns.interceptors.request.use(function(config){
        return config
    })
    
    // 拦截相应
    
    axiosIns.interceptors.response.use(function(config){
        //Toast.hide()
        return config
    })
}
initAxiosIns();
// const request = function(method,params,success,fail) {
// }
export default axiosIns