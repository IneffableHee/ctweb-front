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
        text: '涉农贷款情况',
         textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
             color: "#808080"
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
        data:['涉农贷款余额','涉农贷款增长率','各项贷款增长率']
    },
    xAxis: [
        {
            type: 'category',
            data: ['年初','一季度','二季度','三季度','四季度'],
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
            interval: 2000,
            axisLabel: {
                formatter: '{value} 亿元'
            }
        },
        {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        
        {
            name:'涉农贷款增长率',
            type:'line',
            yAxisIndex: 1,
            data:[0,6, 7, 8, 9],
            itemStyle : { normal: {label : {show: true}} },
           
        },  
        {
            name:'涉农贷款余额',
            type:'bar',
            barWidth:40,
            data:[3396,4482, 3365, 2295, 5566],
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
            name:'各项贷款增长率',
            type:'line',
            yAxisIndex: 1,
            data:[0,2.0, 5, 7, 8],
             // 显示数值
        itemStyle : { normal: {label : {show: true}} },
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
    