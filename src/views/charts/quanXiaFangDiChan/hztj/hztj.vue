<template>
	<div class="content-box">
		<el-tabs tab-position="left">
			<el-tab-pane label="报表">
				<div ref="echart" style="height:420px; "></div>
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
		getGeneralFunctions
	} from '../../../../api/api';
	export default {
		props: ["date"],
		data() {
			return {
				bank: this.$store.getters.bank,
				typeName: "qxfdcHZ",
				rulesDataVisible: false,
				RuleData: [],
				xAxisData: [],
				legendData: [],
				seriesData: [],
				seriesDataObject: {
					name: "",
					yAxisIndex: 0,
					type: 'line',
					data: null,
					barWidth: 40,
					// 显示数值
					itemStyle: {
						normal: {
							label: {
								show: true,
								// formatter: '{b}\n{c}'
							}
						}
					}
				},
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			initEchart() {
				//获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				var _this = this;
				let params = {
					time: _this.date,
					bankName: _this.bank,
					typeName: _this.typeName,
				};
				getGeneralFunctions(params).then((res) => {
					// var data = res.data.data.dataList;
					_this.RuleData = res.data.data.dataRules;
					_this.xDate = res.data.data.xAxisData;
					_this.legendData = res.data.data.legendData;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.legendData.length; i++) {
						for (let key in res.data.data) {
							if (key == _this.legendData[i]) {
								var aa = JSON.parse(JSON.stringify(_this.seriesDataObject));
								if (key == _this.legendData[i]) {
									if (key.indexOf("不良率") != -1) {
										aa.yAxisIndex = 1;
										aa.type = 'line'
									}
									aa.name = key;
									aa.data = res.data.data[key];
									_this.seriesData.push(aa)
								}

							}
						}
					}
					//编写echart参数
					let option = {
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: this.legendData
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
									type: ['line', 'bar']
								},
								restore: {},
								saveAsImage: {},
							}
						},
						calculable: true,
						xAxis: [{
							type: 'category',
							data: this.xDate,
						}],
						yAxis: [{
							type: "value",
							name: "余额",
							axisLabel: {
								formatter: "{value} 万元"
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
