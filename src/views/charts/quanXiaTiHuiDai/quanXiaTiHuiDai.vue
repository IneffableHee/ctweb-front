<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" v-show="echartShow" style="height:420px;"></div>
		<div v-show="noDataShow" align="center">
			<p style=" margin-top: 30px;padding-bottom: 8px;color: #5E7382;">农村信用社“特惠贷”精准扶贫统 当前期次无数据</p>
			<!-- <p >1.请在后台确保相关取数文件是否已经上传 <span style="font-weight: bold;">.zip、.xls、.xlsx </span>尾的文件。</p>
		    <p class="info">2.当前视图取数规则为：<span style="font-weight: bold;">正常贷款额:GF01_II[C8]、关注贷款额：GF01_II[C9]、次级贷款额：GF01_II[C11]、可疑贷款额：GF01_II[C12]、损失贷款额：GF01_II[C13]</span>,确认取数规则是否正确。</p>
			 <p class="info">3.监管员是否为当前期次生成数据，数据生成后系统会自动校验和匹配机构名和期次。</p><br/><br/>
		    -->
			<br /><br />
		</div>
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
		<!-- 		后置条件
		<div style="width: 100%;">
			<el-dialog customClass="customWidth" :visible.sync="dialogVisible" v-if='dialogVisible' @update:visible="newVisible => dialogVisible = newVisible">
				<span>
					<hztj :date="date" />
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">返回</el-button>
				</span>
			</el-dialog>
		</div> -->
	</div>
</template>
<script>
	import {
		tableByName
	} from '../../../api/api';
	import favicon from '../../../images/favicon.png';
	export default {
		data() {
			return {
				dialogVisible: false,
				xDate: [],
				dataValue: [],
				startTime: "201903",
				endTime: "",
				bank: "",
				date: null,
				active: null,
				hztjTitle: null,
				rulesDataVisible: false,
				RuleData: [],
				typeName: "quanXiaTiHuiDai",
				echartShow: true,
				noDataShow: false
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
					typeName: _this.typeName
				};
				tableByName(params).then((res) => {

					console.log("res--" + res)
					_this.dataValue = res.data.data.dataValue;
					_this.xDate = res.data.data.xDate;
					//编写echart参数
					let option = {
						title: {
							text: '农村信用社“特惠贷”精准扶贫统',
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
							// data: [' ', ' ']
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
								// 								myTool1: {
								// 									show: true,
								// 									title: '取数规则',
								// 									icon: 'image://' + favicon,
								// // 									onclick: function() {
								// // 										_this.rulesDataVisible = true;
								// // 									},
								// 								}
							}
						},
						calculable: true,
						xAxis: [{
							// 							axisLabel: {
							// 								interval: 0,
							// 								rotate: 40
							// 							},
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
						series: [{
							name: '特惠贷',
							type: 'bar',
							data: this.dataValue,

							itemStyle: {
								emphasis: {
									barBorderRadius: 7
								},
								normal: {
									barBorderRadius: 7,
									//这里是重点  颜色循环
									// 							                 color: function(params) {
									// 							                 	//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
									// 							                     // var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
									// 							                      var colorList = [ '#d48265'];
									// 							 					return colorList[params.dataIndex]
									// 							                 }
									color: '#d48250'
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



						}, ]
					}

					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});
					// 					chart.on("click", function(param) {
					// 						var time = param.name; //得到时间月份
					// 						var seriesName = param.seriesName;
					// 						_this.dialogVisible = !_this.dialogVisible;
					// 						if (time == "最大值" || time == "最小值") {
					// 							console.log(param.data.coord[0]);
					// 							time = _this.xDate[param.data.coord[0]];
					// 						}
					// 						_this.active = seriesName;
					// 						_this.date = time;
					// 						time = null;
					// 						// console.log(seriesName+"--------"+time+","+ JSON.stringify(param.data)+","+ param.dataIndex);
					// 					});
				}).catch(error => {
					console.log("22--" + error)
					_this.echartShow = false;
					_this.noDataShow = true;
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
