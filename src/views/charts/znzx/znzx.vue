<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"></div>
		<!-- 规则来源 -->
		<div style="width:100%;">
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
				bank: this.$store.getters.bank,
				data: null,
				endTime: "",
				typeName: "znzx",
				//户均贷款余额
				huJunYuEData: null,
				//500万元以下贷款余额占比
				daiKuanYueData: null,
				//农户和小微企业贷款占比
				daiKuanZhanBiData: null,
				xDate: null,
				yuJingDialogVisible: false,
				rulesDataVisible: false,
				RuleData: []
			};
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
					var data = res.data.data;
					// console.log("从后台获取的数据2233:"+JSON.stringify(res));
					_this.xDate = res.data.data.日期;
					_this.huJunYuEData = res.data.data.户均贷款余额;
					_this.daiKuanYueData = res.data.data.单户500万元以下贷款余额占比;
					_this.daiKuanZhanBiData = res.data.data.农户和小微企业贷款占比;
					_this.RuleData = res.data.data.dataRules;
					//编写echart参数
					let option = {
						title: {
							text: '村镇银行支农支小情况',
							textStyle: {
								//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
								fontSize: 18,
								color: "#4682B4"
							},
							// subtext: '500万元以下。。。取数规则有误'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: [{
								data: ['户均贷款余额', '单户500万元以下贷款余额占比']
							},
							{
								top:'20',
								data: ['农户和小微企业贷款占比']
							}
						],
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
								},
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
						calculable: true,
						xAxis: [{
							type: 'category',
							data: this.xDate
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
							},

						}],
						series: [{
								name: '单户500万元以下贷款余额占比',
								yAxisIndex: 1,
								type: 'line',
								data: this.daiKuanYueData,
								// data:[0.89, 0.68, 0.78, 0.88, 0.79, 0.88, 0.89, 0.68, 0.78, 0.88, 0.79, 0.88],
								smooth: true, //这句就是让曲线变平滑的 
								markLine: {
									silent: true,
									data: [{
										symbol: 'circle',
										label: {
											normal: {
												position: 'end',
												formatter: '预警:70.00%'
											}
										},
										yAxis: 0.70,
										name: '预警线',
									}]
								},
							},
							{
								name: '农户和小微企业贷款占比',
								yAxisIndex: 1,
								type: 'line',
								smooth: true, //这句就是让曲线变平滑的 
								data: this.daiKuanZhanBiData,

							},
							{
								name: '户均贷款余额',
								type: 'bar',
								data: this.huJunYuEData,

								// 圆角 显示
								itemStyle: {
									emphasis: {
										barBorderRadius: 10
									},
									normal: {
										barBorderRadius: 10,

									},
								},
							}
						]
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
