<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:360px;"></div>
		<div style="height:80px;">
			<span>相关的文字叙述等：</span><br />
			<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地方政府债务总额增速计算公式 : （当月地方政府债务总额-上月地方政府债务总额） / 上月地方政府债务总额，取数来源 :
				黔南市城市商业银行合计_G52（月报），一年以内=AB32 + AB77 + AB122；一年到五年=AC32 + AC77 + AC122，五年至十年=AD32 + AD77 + AD122，十年以上=AE32 + AE77 +
				AE122。
			</span>
		</div>
	</div>
</template>
<script>
	import {
		getGeneralFunctions
	} from '../../../../api/api';
	export default {
		props: ["date"],
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		data() {
			return {
				dataRuleHZTJ: null,
				bank: this.$store.getters.bank,
				seriesData: null,
				typeName: "dqqx",
				xAxisData: null,
				dataValue: []
			}
		},
		methods: {
			sendMsg() {
				//func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
				this.$emit('func', this.dataRuleHZTJ)
			},
			initEchart() {
				var _this = this;
				let chart = this.$echarts.init(this.$refs.echart);
				let params = {
					time: _this.date,
					bankName: _this.bank,
					typeName: _this.typeName
				};
				getGeneralFunctions(params).then((res) => {
					
					var data = res.data.data;
					_this.xAxisData = res.data.data.xAxisData;
					_this.dataRuleHZTJ = res.data.data.dataRules;
					_this.dataValue = res.data.data.dataValues;
					_this.sendMsg();
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
							//   data: ["正常", "关注", "次级", "可疑", "损失"]
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						xAxis: [{
							axisLabel: {interval:0 },
							type: "category",
							data: this.xAxisData
						}],
						yAxis: [{
							type: "value",
							name: "余额 万元",
							axisLabel: {
								formatter: "{value}"
							}
						}],
						series: [{
							type: "bar",
							barWidth: 40,
							data: this.dataValue,
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
						}]
					};
					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});

				});
			}
		}
	};
</script>
