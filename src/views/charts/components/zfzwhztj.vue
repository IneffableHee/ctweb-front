<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:600px;"
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
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "同比", "环比", "比年初"],
            // ['短期贷款', 43.3, 85.8, 93.7],
            // ['中长期贷款', 83.1, 73.4, 55.1],
            // ['贴现及买断式转贴现', 86.4, 65.2, 82.5],
            // ['贸易融资', 72.4, 53.9, 39.1],
            // ['融资租赁', 43.3, 85.8, 93.7],
            // ['各项垫款', 83.1, 73.4, 55.1],
            // ['其他贷款', 1.17, 2.2,0.5]
            ["短期贷款", 43.3, 85.8, 93.7],
            ["中长期贷款", 83.1, 73.4, 55.1],
            ["贴现及买断式转贴现", 86.4, 65.2, 82.5],
            ["贸易融资", 86.4, 65.2, 82.5],
            ["融资租赁", 72.4, 53.9, 39.1],
            ["各项垫款", 72.4, 53.9, 39.1],
            ["其他贷款", 7.4, 3.9, 1.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: { 
            type: "value",
            name: "余额",
            // min: 0,
            // max: 9000,
            // interval: 2000,
            axisLabel: {
              formatter: "{value} 亿元"
            }},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" },
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
    