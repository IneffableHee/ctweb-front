<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div ref="echart" style="height:500px;"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods:{
    initEchart(){
      //获取DOM节点并初始化
      let chart = this.$echarts.init(this.$refs.echart);
      //编写echart参数

          
let option = {
     title: {
        text: '支农支小',
         textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
            color: "#4682B4"
          }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['户均贷款余额','单户500万元(含)以下贷款余额占比','农户和小微企业贷款合计占比']
    },
    xAxis: [
        {
            type: 'category',
            data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            axisPointer: {
                type: ''
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '余额',
            min: 0,
            max: 6000,
            interval: 1000,
            axisLabel: {
                formatter: '{value} 万元'
            }
        },
        {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 150,
            interval: 10,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name:'单户500万元(含)以下贷款余额占比',
            type:'line',
            yAxisIndex: 1,
            data:[89,68,78,88,79,88,89,68,78,88,79,88],
            smooth:true, //这句就是让曲线变平滑的 
        },
        {
            name:'户均贷款余额',
            type:'bar',
            barWidth:40,
            data:[3396,4482, 3365, 2295, 5566,3396,4482, 3365, 2295, 5566,5550,4000],
            // 圆角 显示
             itemStyle: {
                    emphasis: {
                        barBorderRadius: 10
                    },
                    normal: {
                        barBorderRadius: 10
                    },
             },
        },
        {
            name:'农户和小微企业贷款合计占比',
            type:'line',
            yAxisIndex: 1,
            data:[80,92,90,88,67,72,95,82,69,70,90,78],
            smooth:true, //这句就是让曲线变平滑的 
        },

    ]
};

      // 设置图表的参数
      chart.setOption(option);
      window.addEventListener("resize", function() {
        chart.resize();
      });
    }
  }
};
</script>
    