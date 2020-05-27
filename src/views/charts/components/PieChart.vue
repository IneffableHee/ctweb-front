<template>

  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:420px;"
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
        // 获取DOM节点并初始化
        let chart = this.$echarts.init(this.$refs.echart);
        // 编写echart参数
        let option = {
          title: {
            text: "资产结构",
             textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
            color: "#4682B4"
          },
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["损失", "关注", "次级", "可疑", "正常"]
          },
          series: [
            {
              name: "数据占比",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 80, name: "损失" },
                { value: 310, name: "关注" },
                { value: 234, name: "次级" },
                { value: 135, name: "可疑" },
                { value: 1548, name: "正常" }
              ],
              
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
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
