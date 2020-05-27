<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:390px;"></div>
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
		getBuLiangDaiKuanHZTJ
	} from '../../../../api/api';
	import favicon from '../../../../images/favicon.png';
	export default {
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		data() {
			return {
				xDate: null,
				// 新发放贷款总额
				dataXinFaFangDKZE: null,
				//本期新增不良占比
				dataXingZengBLZB: null,
				//新增不良贷款总额
				dataXinZengBLZE: null,
				typeName: "xingZengBLiang",
				endTime: "",
				bank: "",
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
					// startTime: _this.startTime,
					time: _this.endTime,
					bankName: _this.bank,
					typeName: _this.typeName
				};

				getBuLiangDaiKuanHZTJ(params).then((res) => {
					console.log("从后台获取的数据xingZengBLiang:" + JSON.stringify(res));
					_this.xDate = res.data.data.日期;
					_this.dataXinFaFangDKZE = res.data.data.新发放贷款总额;
					_this.dataXinZengBLZE = res.data.data.新增不良贷款总额;
					_this.dataXingZengBLZB = res.data.data.本期新增不良占比;
					_this.RuleData = res.data.data.dataRules;
					//编写echart参数
					let option = {
						title: {
							text: '本期新增不良贷款占新发放贷款比例',
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
							top: '20',
							data: ['新发放贷款总额', '新增不良贷款总额', '本期新增不良占比'],
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
									icon: 'image://' + favicon,
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
							}
						}],
						series: [{
								name: '新增不良贷款总额',
								type: 'bar',
								data: this.dataXinZengBLZE,
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
								name: '新发放贷款总额',
								type: 'bar',
								data: this.dataXinFaFangDKZE,
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
								}
							},
							{
								name: '本期新增不良占比',
								yAxisIndex: 1,
								type: 'line',
								data: this.dataXingZengBLZB,
								// 显示数值
								itemStyle: {
									normal: {
										label: {
											show: true,
											formatter: '{b}\n{c}'
										}
									}
								}
							},
						]
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
