<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
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
	</div>
</template>
<script>
	import {
		getDaiKuanSunShiZuiBei
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
				dialogVisible: false,
				xDate: null,
				// 不良率
				biLiData: null,
				startTime: "201903",
				endTime: "",
				bank: "",
				date: null,
				active: null,
				hztjTitle: null,
				rulesDataVisible: false,
				RuleData: []
			};
		},
		methods: {
			initEchart() {
				var _this = this;

				_this.endTime = this.$store.getters.time;
				_this.bank = this.$store.getters.bank;

				console.log("bank:" + _this.bank + ",time:" + _this.endTime);
				// 获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				//从后台获取json数据
				let params = {
					time: _this.endTime,
					// endTime: _this.endTime,
					bankName: _this.bank,
				};
				getDaiKuanSunShiZuiBei(params).then((res) => {
					_this.xDate = res.data.data.date;
					_this.biLiData = res.data.data.value;
					_this.RuleData = res.data.data.dataRules;
					//编写echart参数
					let option = option = {
						title: {
							text: '贷款损失准备充足率（季报）',
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
							data: '占比'
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
						calculable: true,
						xAxis: [{
							type: 'category',
							data: this.xDate
						}],
						yAxis: [{
							type: 'value',
							name: '百分比',
							axisLabel: {
							formatter: function(value) {
							return (value*100).toFixed(2)+"%"; 
							}
							}
						}, ],
						series: [{
							name: '占比',
							type: 'line',
							data: this.biLiData,
							// 显示数值
							itemStyle: {
								normal: {
									label: {
										show: true,
										  formatter: '{b}\n{c}'  
									}
								}
							}
						}, ]
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
