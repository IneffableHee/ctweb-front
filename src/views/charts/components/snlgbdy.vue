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
        text: '涉农两个不低于',
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
    legend: [{data:['涉农贷款增量（去年同期）','涉农贷款增速']},{
        
         top: '20',
        data:[ '涉农贷款增量（当期）','各项贷款增速',]
    }],
     // color: ['#FF9224','#FFC781', '#003D79', '#999'],
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
            max: 100,
            interval: 10,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name:'涉农贷款增速',
            type:'line',
            yAxisIndex: 1,
            data:[30,50, 40.8, 40.1, 70],
            smooth:true, //这句就是让曲线变平滑的 
        },
        {
            name:'涉农贷款增量（当期）',
            type:'bar',
            barWidth:40,
            data:[4480,4680, 4786, 4800, 5900],
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
            name:'涉农贷款增量（去年同期）',
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
            name:'各项贷款增速',
            type:'line',
            yAxisIndex: 1,
            data:[20.0,20.9, 40.2, 60.5, 50.2],
            smooth:true, //这句就是让曲线变平滑的 
        }
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
    