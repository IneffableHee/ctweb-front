<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<!-- <div ref="echart" style="height:360px;"></div> -->
		<el-tabs tab-position="left">
			<el-tab-pane label="报表">
				<div ref="echart" style="height:360px; "></div>
			</el-tab-pane>
			<el-tab-pane label="取数规则">
				<el-table :data="RuleData" stripe style="width: 100%">
					<el-table-column type="index">
					</el-table-column>
					<el-table-column prop="onlyCode" label="唯一标识">
					</el-table-column>
					<el-table-column prop="excelCode" label="数据表">
					</el-table-column>
					<el-table-column prop="dataName" label="数据类型">
					</el-table-column>
					<el-table-column prop="dataSource" label="取数规则">
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
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
				bank: this.$store.getters.bank,
				dataX: null,
				//当期
				dataDQ: null,
				//同比
				dataTB: null,
				//环比
				dataHB: null,
				//比年初
				dataBNC: null,
				rulesDataVisible: false,
				RuleData: [],
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			initEchart() { //获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				var _this = this;
				let params = {
					time: _this.date,
					bankName: this.$store.getters.bank,
				};
				getBLQShztj(params).then((res) => {
					var data = res.data.data;
					console.log("从后台获取的数据HZTJ:" + JSON.stringify(data));
					_this.dataX = data.xData;
					_this.dataDQ = data.当期;
					// 					_this.dataTB = data.同比;
					// 					_this.dataHB = data.环比;
					// 					_this.dataBNC = data.比年初;
					_this.RuleData = res.data.data.dataRules;

					//编写echart参数
					let option = {
						title: {
							// text: '当前显示为不良清收的后置条件',
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
							data: ['当期', '同比', '环比', '比年初']
						},
						toolbox: {
							show: true,
							feature: {
								dataView: {
									show: true,
									readOnly: true,
									optionToContent: function(opt) {
										let axisData = opt.xAxis[0].data; //坐标数据
										let series = opt.series; //折线图数据
										let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
										let tdBodys = ''; //数据
										series.forEach(function(item) {
											//组装表头
											tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
										});
										let table =
											`<table border="1"  style="width:80%; margin-left:40px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
										for (let i = 0, l = axisData.length; i < l; i++) {
											for (let j = 0; j < series.length; j++) {
												//组装表数据
												tdBodys += `<td>${ series[j].data[i]}</td>`;
											}
											table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
											tdBodys = '';
										}
										table += '</tbody></table>';
										return table;
									}
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
							data: this.dataX
						}],
						yAxis: [{
							type: 'value',
							name: '余额',
							axisLabel: {
								formatter: '{value} 万元'
							}
						}],
						series: [{
								name: '当期',
								type: 'bar',
								barWidth: 35, //柱图宽度
								data: this.dataDQ,
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
							// 							{
							// 								name: '同比',
							// 								type: 'bar',
							// 								data: this.dataTB,
							// 								// 圆角 显示
							// 								itemStyle: {
							// 									emphasis: {
							// 										barBorderRadius: 7
							// 									},
							// 									normal: {
							// 										barBorderRadius: 7,
							// 
							// 									}
							// 								},
							// 								markPoint: {
							// 									data: [{
							// 											type: 'max',
							// 											name: '最大值'
							// 										},
							// 										{
							// 											type: 'min',
							// 											name: '最小值'
							// 										}
							// 									]
							// 								},
							// 							},
							// 							{
							// 								name: '环比',
							// 								type: 'bar',
							// 								data: this.dataHB,
							// 								// 圆角 显示
							// 								itemStyle: {
							// 									emphasis: {
							// 										barBorderRadius: 7
							// 									},
							// 									normal: {
							// 										barBorderRadius: 7,
							// 
							// 									}
							// 								},
							// 								markPoint: {
							// 									data: [{
							// 											type: 'max',
							// 											name: '最大值'
							// 										},
							// 										{
							// 											type: 'min',
							// 											name: '最小值'
							// 										}
							// 									]
							// 								},
							// 							},
							// 							{
							// 								name: '比年初',
							// 								type: 'bar',
							// 								data: this.dataBNC,
							// 								// 圆角 显示
							// 								itemStyle: {
							// 									emphasis: {
							// 										barBorderRadius: 7
							// 									},
							// 									normal: {
							// 										barBorderRadius: 7,
							// 
							// 									}
							// 								},
							// 								markPoint: {
							// 									data: [{
							// 											type: 'max',
							// 											name: '最大值'
							// 										},
							// 										{
							// 											type: 'min',
							// 											name: '最小值'
							// 										}
							// 									]
							// 								},
							// 							}
						]
					};
					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});
					chart.on("click", function(param) {
						var time = param.name; //得到时间月份
						if (time == "最大值" || time == "最小值") {
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
