<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:270px;"
    ></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      //获取DOM节点并初始化
      let chart = this.$echarts.init(this.$refs.echart);
      //编写echart参数

      let option = {
    title : {
        text: '最近13个月房地产开发贷款柱状图',
         textStyle: {
            //主标题文本样式{"fontSize": xx,"fontWeight": "bolder","color": "#333"}
            fontSize: 15,
            color: "#808080"
          }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['按揭贷款','商用房购房贷款']
    },
    toolbox: {
        show : true,
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['去年12月','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            type:'bar',
            data:[3.0,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.9],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
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
    ]
}
      // 设置图表的参数
      chart.setOption(option);
      window.addEventListener("resize", function() {
        chart.resize();
      });
    }
  }
};
</script>
    