import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { bar, tooltip, title } from 'echarts'

export default class Api extends React.Component {
    constructor(props) {
        super(props);
    }

    //侧边栏点击修改props渲染数据
    componentWillReceiveProps(props) {
         // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('jvm'), 'dark');
         // 绘制图表
         myChart.setOption({
             backgroundColor: '#2c343c',
 
             title: {
                 text: 'jvm使用情况',
                 left: 'center',
                 top: 20,
                 textStyle: {
                     color: '#ccc'
                 }
             },
 
             tooltip: {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
 
             visualMap: {
                 show: false,
                 min: 80,
                 max: 600,
                 inRange: {
                     colorLightness: [0, 1]
                 }
             },
             series: [
                 {
                     name: 'jvm使用情况',
                     type: 'pie',
                     radius: '55%',
                     center: ['50%', '50%'],
                     data: [
                          {
                              
                            }
                     ].sort(function (a, b) { return a.value - b.value; }),
                     roseType: 'radius',
                     label: {
                         normal: {
                             textStyle: {
                                 color: 'rgba(255, 255, 255, 0.3)'
                             }
                         }
                     },
                     labelLine: {
                         normal: {
                             lineStyle: {
                                 color: 'rgba(255, 255, 255, 0.3)'
                             },
                             smooth: 0.2,
                             length: 10,
                             length2: 20
                         }
                     },
                     itemStyle: {
                         normal: {
                             color: '#c23531',
                             shadowBlur: 200,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     },
 
                     animationType: 'scale',
                     animationEasing: 'elasticOut',
                     animationDelay: function (idx) {
                         return Math.random() * 200;
                     }
                 }
             ]
         });
    }



    componentDidMount() {
       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(document.getElementById('jvm'), 'dark');
       // 绘制图表
       myChart.setOption({
           backgroundColor: '#2c343c',

           title: {
               text: 'jvm使用情况',
               left: 'center',
               top: 20,
               textStyle: {
                   color: '#ccc'
               }
           },

           tooltip: {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
           },

           visualMap: {
               show: false,
               min: 80,
               max: 600,
               inRange: {
                   colorLightness: [0, 1]
               }
           },
           series: [
               {
                   name: 'jvm使用情况',
                   type: 'pie',
                   radius: '55%',
                   center: ['50%', '50%'],
                   data: [
                       { value: "Object.values(props.result)", name: "Object.keys(props.result)" },
                   ].sort(function (a, b) { return a.value - b.value; }),
                   roseType: 'radius',
                   label: {
                       normal: {
                           textStyle: {
                               color: 'rgba(255, 255, 255, 0.3)'
                           }
                       }
                   },
                   labelLine: {
                       normal: {
                           lineStyle: {
                               color: 'rgba(255, 255, 255, 0.3)'
                           },
                           smooth: 0.2,
                           length: 10,
                           length2: 20
                       }
                   },
                   itemStyle: {
                       normal: {
                           color: '#c23531',
                           shadowBlur: 200,
                           shadowColor: 'rgba(0, 0, 0, 0.5)'
                       }
                   },

                   animationType: 'scale',
                   animationEasing: 'elasticOut',
                   animationDelay: function (idx) {
                       return Math.random() * 200;
                   }
               }
           ]
       });
    }
    render() {
        return (
            <div id="jvm" style={{ width: 800, height: 800 ,margin:'auto'}}></div>
        );
    }
}
