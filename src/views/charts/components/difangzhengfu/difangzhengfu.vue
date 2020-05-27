<template>
  <div class="content-box">
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
    <div
      ref="echart"
      style="height:400px;"
    > </div>
    <div>
      <el-button
        type="text"
        @click="dialogTableVisible = true"
      >资产质量</el-button>

      <el-dialog
        title="资产质量"
        top="20px"
        width="70%"
        :visible.sync="dialogTableVisible"
      >
        <span>
          <Row>
            <Card shadow>
              <hztj  />
            </Card>
          </Row>
        </span>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogTableVisible = false">返 回</el-button>
        </div>
      </el-dialog>

      <el-button
        type="text"
        @click="dialogFormVisible = true"
      >到期期限</el-button>

      <el-dialog
        title="到期期限"
        width="70%"
        top="20px"
        :visible.sync="dialogFormVisible"
      >
        <span>
          <Row>
            <Card shadow>
              <dqqx   />
            </Card>
          </Row>
        </span>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import hztj from "./zczl.vue";
import dqqx from "./dqqx.vue";
export default {
  components: {
    hztj,
    dqqx
  },
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false
    };
  },
  // kai_w_x
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // kai_w_x
    initEchart() {
      //获取DOM节点并初始化
      let chart = this.$echarts.init(this.$refs.echart);
      //编写echart参数

      let option = {
        title: {
          text: "政府债务",
            textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
            color: "#4682B4"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: [
            "地方政府提供担保",
            "地方政府承诺偿还",
            "形成地方政府长期支出责任的融资",
            "增长率"
          ]
        },
        xAxis: [
          {
            type: "category",
            data: ["上年初", "1月", "2月", "3月", "4月"],
            axisPointer: {
              type: ""
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "余额 亿元",
            // min: 0,
            // max: 9000,
            // interval: 2000,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "百分比",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
 
          {
            name: "地方政府提供担保",
            type: "bar",
            barWidth: 40,
            stack: "广告",
             // 显示数值
            data: [3369, 4456, 3330, 3669, 3946]
          },
          {
            name: "地方政府承诺偿还",
            type: "bar",
            barWidth: 40,
            stack: "广告",
            data: [3396, 4482, 3365, 2295, 5566]
          },
          {
            name: "形成地方政府长期支出责任的融资",
            type: "bar",
            barWidth: 40,
            stack: "广告",
            data: [3396, 4482, 3365, 2295, 5566]
          },
          {
            name: "增长率",
            type: "line",
            yAxisIndex: 1,
            data: [0, 2.0, 5, 7, 8]
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
    