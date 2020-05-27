<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"></div>
	</div>
</template>
<script>
		import {
		getBLQShztj
	} from '../../../../api/api';
	
	export default {
		props: ["date"],
		data() {
			return {
				bank:this.$store.getters.bank,
				dataX:null,
				//委托贷款
				dataWeiTuo:null,
				//承兑汇票
				dataDuiPiao:null,
				//未使用的信用卡额度
				dataXingYong:null,
				// 代理代销业务
				dataDaiXiao:null,
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			initEchart() {//获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				
				var _this = this;
				let params = {
					time: _this.date,
					bankName:this.$store.getters.bank,
				};
				console.log("time:"+params.time+",bank:"+params.bankName);
				getBLQShztj(params).then((res) => {
					var data = res.data.data;
					console.log("从后台获取的数据HZTJ:" + JSON.stringify(data));
					_this.dataX = data.日期;
					_this.dataWeiTuo=data.委托贷款;
					_this.dataDuiPiao=data.承兑汇票;
					_this.dataXingYong=data.未使用的信用卡额度;
					_this.dataDaiXiao=data.代理代销业务;
					
				//编写echart参数

				let option = {
					title: {
						text: '当前显示为表外业务的后置条件',
						subtext: '4个柱状图',
						textStyle: {
							//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
							fontSize: 18,
							color: "#4682B4"
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['委托贷款', '承兑汇票', '未使用的信用卡额度', '代理代销业务']
					},
					toolbox: {
						show: true,
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						data:this.dataX
					}],
							yAxis: [{
			type: 'value',
			name: '余额',
			axisLabel: {
				formatter: '{value} 万元'
			}
		}],
					series: [{
							name: '委托贷款',
							type: 'bar',
							data: this.dataWeiTuo,
							// 圆角 显示
							itemStyle: {
								emphasis: {
									barBorderRadius: 7
								},
								normal: {
									barBorderRadius: 7,
							
								}
							},
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
						},
						{
							name: '承兑汇票',
							type: 'bar',
							data: this.dataDuiPiao,
							// 圆角 显示
							itemStyle: {
								emphasis: {
									barBorderRadius: 7
								},
								normal: {
									barBorderRadius: 7,
							
								}
							},
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
						},
						{
							name: '未使用的信用卡额度',
							type: 'bar',
							data: this.dataXingYong,
							// 圆角 显示
							itemStyle: {
								emphasis: {
									barBorderRadius: 7
								},
								normal: {
									barBorderRadius: 7,
							
								}
							},
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
						},
						{
							name: '代理代销业务',
							type: 'bar',
							data: this.dataDaiXiao,
							// 圆角 显示
							itemStyle: {
								emphasis: {
									barBorderRadius: 7
								},
								normal: {
									barBorderRadius: 7,
							
								}
							},
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
						}
					]
				};



				// 设置图表的参数
				chart.setOption(option);
				window.addEventListener("resize", function() {
					chart.resize();
				});
				chart.on("click", function(param) {
					var time = param.name; //得到时间月份
					if(time=="最大值"||time=="最小值"){
						console.log(param.data.coord[0]);
						time = _this.xDate[param.data.coord[0]];
					}
					var seriesName = param.seriesName;
					_this.dialogVisible = !_this.dialogVisible;
				});
				});
			}
		}
	};
</script>
