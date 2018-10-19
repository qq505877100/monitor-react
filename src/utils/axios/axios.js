import axios from 'axios';
let axiosIns;
//初始化axios实例
function initAxiosIns() {
    axiosIns = axios.create({
        baseURL: 'http://localhost:8090/monitor',
        timeout: 10000,
        // withCredentials : true
      });
    
    //请求之前拦截
    axiosIns.interceptors.request.use(function(config){
        return config
    })
    
    // 响应后的拦截
    axiosIns.interceptors.response.use(function(config){
        //Toast.hide()
        return config
    })

}
initAxiosIns();
// const request = function(method,params,success,fail) {
// }
export default axiosIns