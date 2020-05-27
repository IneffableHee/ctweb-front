<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"> </div>
		<el-dialog title="政府债务后置" :visible.sync="dialogVisible" v-if='dialogVisible' @update:visible="newVisible => dialogVisible = newVisible">
			<el-select v-model="value" @change="getHztj(value)">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-tabs tab-position="left">
				<el-tab-pane label="到期期限报表">
					<modal v-if="zczlVisible">
						<zczl :date="date" @func="getZczlSon"></zczl>
					</modal>
					<modal v-if="dqqxVisible">
						<dqqx :date="date" @func="getDqqxSon"></dqqx>
					</modal>
				</el-tab-pane>
				<el-tab-pane label="取数规则">
					<el-table :data="RuleDataHZTJ" stripe style="width: 100%">
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
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>
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
	import zczl from "./hztj/zczl.vue";
	import dqqx from "./hztj/dqqx.vue";
	import favicon from '../../../images/favicon.png';
	export default {
		components: {
			zczl,
			dqqx
		},
		data() {
			return {
				typeName: "dfzfzw", //地方政府债务
				aaj: "asdas",
				dqqxVisible: true,
				zczlVisible: false,
				options: [{
					value: 'dqqx',
					label: '到期期限'
				}, {
					value: 'zczl',
					label: '资产质量'
				}],
				value: 'dqqx',
				dialogVisible: false,
				dataValue: null,
				endTime: "",
				date: null,
				RuleDataHZTJ: [],
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
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
		},
		methods: {
			getHztj(value) {
				// this.dialogVisible = false;
				if (value == 'zczl') {
					this.RuleDataHZTJ = null;
					this.dqqxVisible = false;
					this.zczlVisible = true;
				} else if (value == 'dqqx') {
					this.dqqxVisible = true;
					this.zczlVisible = false;
				}
				// this.aa()
			},
// 			aa() {
// 				this.dialogVisible = !this.dialogVisible;
// 			},
			getDqqxSon(dataRuleHZTJ) {
				this.RuleDataHZTJ = dataRuleHZTJ
			},
			getZczlSon(dataRuleHZTJ){
				this.RuleDataHZTJ = dataRuleHZTJ
			},
			// kai_w_x
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
				getGeneralFunctions(params).then((res) => {
					_this.xDate = res.data.data.xAxisData;
					_this.xDate[0] = "年初";
					_this.legendData = res.data.data.legendData;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.legendData.length; i++) {
						for (let key in res.data.data) {
							if (key == _this.legendData[i]) {
								var aa = JSON.parse(JSON.stringify(_this.seriesDataObject));
								if (key == _this.legendData[i]) {
									if (key.indexOf("增速") != -1) {
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
						title: {
							text: "政府债务",
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
										_this.rulesDataVisible = true;
									}
								}
							}
						},
						legend: {
							data: this.legendData
						},
						xAxis: [{
							type: 'category',
							data: this.xDate,
						}],
						yAxis: [{
								type: "value",
								name: "余额 亿元",
								splitLine: {
									show: false
								},
								// min: 0,
								// max: 9000,
								// interval: 2000,
								axisLabel: {
									formatter: "{value}"
								}
							},
							{
								type: "value",
								name: "百分比",
								axisLabel: {
									formatter: "{value} %"
								}
							}
						],
						series: this.seriesData
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
						if ('年初' == time) {
							_this.date = res.data.data.xAxisData[0]
						}
					});
				});
			}
		}
	};
</script>
