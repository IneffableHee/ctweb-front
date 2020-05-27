<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"></div>
		<!-- 预警条件 -->
		<div style="width: 100%;">
			<el-dialog class="mybox" :append-to-body="true" :visible.sync="yuJingDialogVisible" @update:visible="newVisible => yuJingDialogVisible = newVisible">
				<el-table :data="RuleData" stripe style="width: 100%">
					<el-table-column type="index">
					</el-table-column>
					<el-table-column prop="excelCode" label="数据表">
					</el-table-column>
					<el-table-column prop="dataName" label="数据类型">
					</el-table-column>
					<el-table-column prop="dataSource" label="取数规则">
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-button @click="yuJingDialogVisible = false">返回</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import {
		getNHLiRunShouRu
	} from '../../../api/api';
	import favicon from '../../../images/favicon.png';
	export default {
		data() {
			return {
				dialogVisible: false,
				yuJingDialogVisible: false,
				isShowGaoJin: false,
				xDate: null,
				yuJingData: "日期为:",
				typeName: "liRunLv",
				endTime: "",
				bank: "",
				RuleData: [],
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
					message: '资产利润率不低于0.6%，资本利润率不低于11%，' + this.yuJingData + '请到利润率页面查看详细信息！',
					type: 'warning',
					duration: 9000
				})
			},
			initEchart() {
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank = this.$store.getters.bank;
				// console.log("bank:" + _this.bank + ",time:" + _this.endTime);
				//获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				var _this = this;
				let params = {
					// startTime: _this.startTime,
					time: _this.endTime,
					bankName: _this.bank,
					typeName: _this.typeName
				};
				console.log("time:" + params.time + ",bank:" + params.bankName);
				getNHLiRunShouRu(params).then((res) => {
					console.log("从后台获取的数据利润率:" + JSON.stringify(res));
					_this.xDate = res.data.data.日期;
					_this.dataZiChan = res.data.data.资产利润率;
					_this.dataZiBen = res.data.data.资本利润率;
					_this.dataJinLiRun = res.data.data.净利润;
					_this.dataweiFenPeiLiRun = res.data.data.未分配利润;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.dataZiChan.length; i++) {
						if (_this.dataZiChan[i] <= 0.016 || _this.dataZiBen[i] <= 0.11) {
							_this.yuJingData += _this.xDate[i] + ";";
						}
					}
					if (_this.yuJingData != "日期为:") {

						_this.open4()
					}
					//编写echart参数 
					let option = {
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
							data: ['资产利润率', '资本利润率', '净利润', '未分配利润']
						},
						toolbox: {
							show: true,
							// 查看预警条件
							feature: {
								dataZoom: {
									yAxisIndex: 'none'
								},
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
									icon: 'image://' + favicon,
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
							data: this.xDate,
						}],
						yAxis: [{
							type: "value",
							name: "余额",
							splitLine: {
								show: false
							},
							axisLabel: {
								formatter: "{value} 万元"
							}
						}, {
							type: 'value',
							name: '百分比',
							axisLabel: {
								formatter: function(value) {
									return (value * 100).toFixed(2) + "%";
								}
							}
						}],
						series: [{
								name: '资产利润率',
								type: 'line',
								yAxisIndex: 1,
								data: this.dataZiChan,
								// 显示数值
								itemStyle: {
									normal: {
										label: {
											show: true,
											formatter: ' {c}'
										}
									}
								},
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
							},
							{
								name: '资本利润率',
								type: 'line',
								yAxisIndex: 1,
								data: this.dataZiBen,
								// 显示数值
								itemStyle: {
									normal: {
										label: {
											show: true,
											formatter: ' {c}'
										}
									}
								},
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
							{
								name: '净利润',
								type: 'bar',
								data: this.dataJinLiRun,
								// 显示数值
								itemStyle: {
									normal: {
										barBorderRadius: 7,
										label: {
											show: true,
											formatter: ' {c}'
										}
									}
								},
							},
							{
								name: '未分配利润',
								type: 'bar',
								data: this.dataweiFenPeiLiRun,
								// 显示数值
								itemStyle: {
									normal: {
										barBorderRadius: 7,
										label: {
											show: true,
											formatter: ' {c}'
										}
									}
								},
							}
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

					});
				});
			}
		}
	};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
