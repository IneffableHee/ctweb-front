<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:360px;"></div>
		<div style="height:80px;">
			<span>相关的文字叙述等：</span><br />
			<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地方政府债务总额增速计算公式 : （当月地方政府债务总额-上月地方政府债务总额） / 上月地方政府债务总额，取数来源 :
				分支报表-政策性银行-中国农业发展银行黔南州分行__G52（月报），正常=V32 + V77 + V122；关注=W32 + W77 + W122，次级=X32 + X77 + X122，可疑=Y32 + Y77 +
				Y122,损失=Z32 + Z77 + Z122</span>
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
				seriesData: [],
				typeName: "zczl",
				xAxisData: null,
				dataValue: [],
				legendData: [],
				seriesDataObject: {
					name: "",
					type: "bar",
					stack: "广告",
					barWidth: 40,
					data: [],
					// 显示数值
					itemStyle: {
						normal: {
							barBorderRadius: 7,
							label: {
								show: true
							}
						}
					},
				},
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
					_this.dataRuleHZTJ = res.data.data.dataRules;
					_this.xDate = res.data.data.日期;
					_this.legendData = res.data.data.legendData;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.legendData.length; i++) {
						for (let key in res.data.data) {
							if (key == _this.legendData[i]) {
								var aa = JSON.parse(JSON.stringify(_this.seriesDataObject));
								if (key == _this.legendData[i]) {
									aa.name = key;
									aa.data = res.data.data[key];
									_this.seriesData.push(aa)
								}

							}
						}
					}
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
							left:100,
							data: this.legendData
						}, 
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						xAxis: [{
							type: "category",
							data: this.xDate,
						}],
						yAxis: [{
							type: "value",
							// name: "余额 万元",
							axisLabel: {
								formatter: "{value}万元"
							}
						}],
						series: this.seriesData
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
