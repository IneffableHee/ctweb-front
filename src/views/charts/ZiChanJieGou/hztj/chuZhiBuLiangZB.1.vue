<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:390px;"
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

      let option =option = {
    title : {
        text: '处置不良贷款占新形成不良贷款的比例 ',
        textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
             fontSize: 15,
            color: "#808080"
          }
    },
    tooltip : {
        trigger: 'axis',
 
    },
    legend: {
        data:['本期处置不良金额','本期新形成不良的金额(含处置部分)','占比']
    },
    toolbox: {
        show : true,
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : [ '1季度','2季度','3季度','4季度','5季度']
        }
    ],
    yAxis : [
        {
            type : 'value'
        },{
							type: 'value',
							name: '百分比',
							axisLabel: {
							formatter: function(value) {
							return (value*100).toFixed(2)+"%"; 
							}
							}
						}
    ],
    series : [
        {
            name:'本期处置不良金额',
            type:'bar',
            data:[ 35.6, 162.2, 32.6, 20.0, 6.4],
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
        {
            name:'本期新形成不良的金额(含处置部分)',
            type:'bar',
            data:[175.6, 182.2, 48.7, 18.8, 8.0],
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
             }
        },
		{
					  name:'占比',
					  yAxisIndex: 1,
					 type:'line',
					 data:[10.6, 100.2, 32.6, 20.0, 6.4, 3.9],
				 }
    , ]
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
    