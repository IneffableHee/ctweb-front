<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"></div>
		<!-- 规则来源 -->
		<div style="width: 100%;">
			<el-dialog title="取数规则:" class="mybox" :append-to-body="true" :visible.sync="rulesDataVisible" @update:visible="newVisible => yuJingDialogVisible = newVisible">
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
				<span slot="footer" class="dialog-footer">
					<el-button @click="rulesDataVisible = false">返回</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import {
		getGeneralFunctions
	} from '../../../api/api';
	import favicon from '../../../images/favicon.png';
	export default {
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		data() {
			return {
				typeName: "fdc",
				endTime: "",
				bank: "",
				rulesDataVisible: false,
				RuleData: [],
				xAxisData: [],
				legendData: [],
				seriesData: [],
				seriesDataObject: {
					name: "",
					yAxisIndex: 0,
					type: 'bar',
					data: null,
					barWidth: 40,
					// 显示数值
					itemStyle: {
						normal: {
							barBorderRadius: 7,
							label: {
								show: true,
								// formatter: '{b}\n{c}'
							}
						}
					}
				},
			}
		},
		methods: {
			initEchart() {
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank = this.$store.getters.bank;
				//获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				var _this = this;
				let params = {
					time: _this.endTime,
					bankName: _this.bank,
					typeName: _this.typeName
				};
				console.log("time:" + params.time + ",bank:" + params.bankName);
				getGeneralFunctions(params).then((res) => {
					_this.xDate = res.data.data.xAxisData;
					_this.legendData = res.data.data.legendData;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.legendData.length; i++) {
						for (let key in res.data.data) {
							if (key == _this.legendData[i]) {
								var aa = JSON.parse(JSON.stringify(_this.seriesDataObject));
								if (key == _this.legendData[i]) {
									if (key.indexOf("增速")!=-1) {
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
					let option = {
						title: {
							text: '房地产',
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
							data: this.legendData
						},
						toolbox: {
							show: true,
							// 查看预警条件
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
								myTool1: {
									show: true,
									title: '取数规则',
									icon: 'image://'+favicon,
									onclick: function() {
										// _this.isShowGaoJin= true;
										_this.rulesDataVisible = true;

									}
								}
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
							splitLine: {
								show: false
							},
							axisLabel: {
								formatter: "{value} 亿元"
							}
						}, {
							type: 'value',
							name: '百分比',
							axisLabel: {
								formatter: function(value) {
									return (value*100).toFixed(2)+"%"; 
								}
							}
						}],
						series: this.seriesData
					}
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
