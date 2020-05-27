<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;" ></div>
		<!-- 预警条件 -->
		<div style="width: 100%;">
			<el-dialog class="mybox" :visible.sync="yuJingDialogVisible" @update:visible="newVisible => yuJingDialogVisible = newVisible">
				<span>
					<p> sdasd</p>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="yuJingDialogVisible = false">返回</el-button>
				</span>
			</el-dialog>
		</div>
		<!-- 后置条件 -->
		<div style="width: 100%;">
			<el-dialog class="mybox" :visible.sync="dialogVisible" @update:visible="newVisible => dialogVisible = newVisible">
				<span>
					<p>后置条件</p>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">返回</el-button>
					<!--  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				yuJingDialogVisible:false,
				isShowGaoJin:false
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			 open4() {
        this.$notify({
          title: '警告',
          message: '当前利润率中成本收入比已高于35%，请到利润率页面查看详细信息！！！',
          type: 'warning',
		   duration: 0
        })
		},

			initEchart() {
				var _this = this;
				//获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				_this.open4();
				//编写echart参数 
				let option = option = {
					title: {
						text: '资产利润率和资本利润率',
						textStyle: {
							//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
							fontSize: 15,
							color: "#808080"
						}
					},
					tooltip: {
						trigger: 'axis',

					},
					legend: {
						data: ['成本收入比', '中间业务收入比']
					},
					toolbox: {
						show: true,
						// 查看预警条件
						feature: {
							myTool1: {
								show: true,
								title: '预警条件',
								icon: 'image://http://echarts.baidu.com/images/favicon.png',
								onclick: function() {
								   // _this.isShowGaoJin= true;
								   _this.yuJingDialogVisible = true;
								 
								}
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						data: ['1季度', '2季度', '3季度', '4季度', '5季度']
					}],
					yAxis: [{
						type: 'value',
						name: '百分比',
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
							name: '本期处置不良金额',
							type: 'line',
							data: [35.6, 162.2, 32.6, 20.0, 6.4],
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
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
							name: '本期新形成不良的金额(含处置部分)',
							type: 'line',
							data: [175.6, 182.2, 48.7, 18.8, 8.0],
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
								]
							},
							// 圆角 显示
							//              itemStyle: {
							//                     emphasis: {
							//                         barBorderRadius: 10
							//                     },
							//                     normal: {
							//                         barBorderRadius: 10
							//                     },
							//              }
						},
					]
				}

				// 设置图表的参数
				chart.setOption(option);
				window.addEventListener("resize", function() {
					chart.resize();
				});
				chart.on("click", function(param) {
					var time = param.name; //得到时间月份
					var seriesName = param.seriesName;
					_this.dialogVisible = !_this.dialogVisible;
				});
			}
		}
	};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
