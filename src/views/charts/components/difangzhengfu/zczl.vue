<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:360px;"
    ></div>
        <div
      style="height:180px;"
    >
    <span>相关的文字叙述等：</span>
    
    
    
    </div>
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["正常", "关注", "次级", "可疑", "损失"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["上年末", "2月", "3月", "4月"]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "余额 万元",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "损失",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: [120, 132, 101, 134]
          },
          {
            name: "关注",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: [220, 182, 191, 234]
          },
          {
            name: "次级",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: [150, 232, 201, 154]
          },
          {
            name: "可疑",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: [862, 1018, 964, 1026]
          },
          {
            name: "正常",
            type: "bar",
            stack: "广告",
            data: [620, 732, 701, 734],
            
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
    