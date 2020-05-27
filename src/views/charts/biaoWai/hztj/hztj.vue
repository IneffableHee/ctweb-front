<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
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
		getBWYWHZTJ
	} from '../../../../api/api';

	export default {
		props: ["date"],
		data() {
			return {
				bank: this.$store.getters.bank,
				dataLegend: ['委托贷款', '承兑汇票', '未使用的信用卡额度', '代理代销业务'],
				dataX: null,
				//委托贷款
				dataWeiTuo: null,
				//承兑汇票
				dataDuiPiao: null,
				//未使用的信用卡额度 、、可随时无条件撤销的贷款承诺
				dataXingYong: null,
				// 代理代销业务
				dataDaiXiao: null,
				rulesDataVisible: false,
				RuleData: [],
				xAxisData: [],
				legendData: [],
				seriesData: [],
				seriesDataObject: {
					name: '',
					type: 'bar',
					data: null,
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
				console.log("time:" + params.time + ",bank:" + params.bankName);
				getBWYWHZTJ(params).then((res) => {
					_this.xDate = res.data.data.日期;
					_this.legendData = res.data.data.dataLegend;
					_this.RuleData = res.data.data.dataRules;
					for (var i = 0; i < _this.legendData.length; i++) {
						for (let key in res.data.data) {
							if (key == _this.legendData[i]) {
								var aa = JSON.parse(JSON.stringify(_this.seriesDataObject));
								if (key == _this.legendData[i]) {
									aa.name = key;
									aa.data = res.data.data[key];
									_this.seriesData.push(aa)
								}
							}
						}
					};
					// 					var data = res.data.data;
					// 					_this.RuleData = res.data.data.dataRules;
					// 					_this.dataX = data.日期;
					// 					_this.dataWeiTuo = data.委托贷款;
					// 					_this.dataDuiPiao = data.承兑汇票;
					// 					if(_this.bank == '贵州银行黔南分行'){
					// 						_this.dataXingYong = data.可随时无条件撤销的贷款承诺;
					// 						_this.dataLegend[2] = '可随时无条件撤销的贷款承诺';
					// 					}else{
					// 					_this.dataXingYong = data.未使用的信用卡额度;
					// 					}
					// 					_this.dataDaiXiao = data.代理代销业务;
					// 
					//编写echart参数
					let option = {
						title: {
							// text: '当前显示为表外业务的后置条件',
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
							data: this.xDate,
						}],
						yAxis: [{
							type: 'value',
							name: '余额',
							axisLabel: {
								formatter: '{value} 万元'
							}
						}],
						series: this.seriesData
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
