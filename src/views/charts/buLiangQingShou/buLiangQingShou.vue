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
		<!-- 后置条件 -->
		<div style="width: 100%;">
			<el-dialog class="mybox" title="不良清收后置条件" :visible.sync="dialogVisible" v-if='dialogVisible' @update:visible="newVisible => dialogVisible = newVisible">
				<span>
					<hztj :date="date" />
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
	import hztj from "./hztj/hztj.vue";
	import {
		getBuLiangQingShou
	} from '../../../api/api';
	import favicon from '../../../images/favicon.png';
	export default {
		components: {
			hztj
		},
		data() {
			return {
				dialogVisible: false,
				xDate: null,
				dataValue: null,
				// startTime: "201903",
				endTime: "",
				date: null,
				rulesDataVisible: false,
				RuleData: []
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			initEchart() {
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank = this.$store.getters.bank;
				// 获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				//从后台获取json数据
				let params = {
					time: _this.endTime,
					bankName: _this.bank,
				};
				getBuLiangQingShou(params).then((res) => {
					_this.xDate = res.data.data.date;
					_this.dataValue = res.data.data.value;
					_this.RuleData = res.data.data.dataRules;
					//编写echart参数
					let option = {
						//  backgroundColor: 'rgba(0, 0, 0, 0.1)',
						title: {
							text: "不良贷款清收处置情况",
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
								myTool1: {
									show: true,
									title: '取数规则',
									icon: 'image://'+favicon,
									onclick: function() {
										_this.rulesDataVisible = true;
									},
								}
							}
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						xAxis: {
							type: "category",
							boundaryGap: false,
							axisLine: {
								lineStyle: {
									color: "#999"
								}
							},
							axisTick: {
								lineStyle: {
									color: "#999"
								}
							},
							data: this.xDate,
						},
						yAxis: {
							type: "value",
							name: "余额",
							axisLabel: {
								formatter: "{value} 万元"
							},
							axisLine: {
								lineStyle: {
									color: "#999"
								}
							},
							axisTick: {
								lineStyle: {
									color: "#999"
								}
							}
						},
						series: [{
							data: this.dataValue,
							// 设置警告线 向上
// 							markLine: {
// 							  data: [
// 							    [
// 							      {
// 							        name: "报警上限",
// 							        // coord:[0,100]
// 							        coord: [0, 10]
// 							      },
// 							      {
// 							        coord: [0, 900]
// 							      }
// 							    ]
// 							  ]
// 							},
							type: "line",
							smooth: true,
							symbolSize: 7,

							areaStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
											offset: 0,
											color: "rgba(0, 136, 212, 0.3)" // 0% 处的颜色
										},
										{
											offset: 0.7,
											color: "rgba(0, 136, 212, 0)" // 100% 处的颜色
										},
										{
											offset: 1,
											color: "rgba(0, 0, 0, 0.1)" // 100% 处的颜色
										}
									],
									global: false // 缺省为 false
								}
							},
							// 显示数值
							itemStyle: {
								normal: {
									label: {
										show: true,
										formatter: '{b}\n{c}'
									}
								}
							}
						}]
					};
					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});
					chart.on("click", function(param) {
						var time = param.name; //得到时间月份
						var seriesName = param.seriesName;
						_this.dialogVisible = !_this.dialogVisible;
						_this.active = seriesName;
						_this.date = time;
						// console.log(seriesName+"--------"+time+","+ JSON.stringify(param.date)+","+ param.dataIndex);
					});
				});
			}
		}
	};
</script>
<style>
	.customWidth {
		width: 80%;
	}
</style>
