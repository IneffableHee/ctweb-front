<template>
	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:400px;"></div>
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
		
		<div style="width: 100%;">
			<el-dialog class="mybox" :title="hztjTitle" :visible.sync="dialogVisible" @update:visible="newVisible => dialogVisible = newVisible">
				<span>
					<el-row>
						<el-card v-if="(active == '存款')&dialogVisible" class="childbox">
							<cunkuan :date="date"/>
						</el-card>
						<el-card v-else-if="(active == '贷款')&dialogVisible" class="childbox">
							<daikuan :date="date"/>
						</el-card>
						<el-card v-else-if="(active == '资产')&dialogVisible" class="childbox">
							<zichan :date="date"/>
						</el-card>
						<el-card v-else-if="(active == '负债')&dialogVisible" class="childbox">
							<fuzhai :date="date"/>
						</el-card>
						<el-card v-else-if="(active == '不良率')&dialogVisible" class="childbox">
							<bulianglv :date="date"/>
						</el-card>
					</el-row>
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
	import cunkuan from "./hztj/cunkuan.vue";
	import daikuan from "./hztj/daikuan.vue";
	import zichan from "./hztj/zichan.vue";
	import fuzhai from "./hztj/fuzhai.vue";
	import bulianglv from "./hztj/bulianglv.vue";
	import favicon from '../../../images/favicon.png';
	import util from '../../../common/js/util';
	import axios from 'axios';
	import {
		getEchartsQjgl
	} from '../../../api/api';
	export default {
		name:"qjgl",
		props:["institution"],
		components: {
			cunkuan,daikuan,zichan,fuzhai,bulianglv
		},
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
				defectiveRateData: null,
				// 贷款	 
				theLoanData: null,
				// 存款
				depositData: null,
				// 资产  
				assetsData: null,
				// 负债  
				liabilitiesData: null,
				// startTime:"201901",
				endTime:"",
				bank:"",
				date:null,
				active:null,
				hztjTitle:null,
				rulesDataVisible:false,
				RuleData:[]
			};
		},

		methods: {
			// 不良率的后置条件
			hztj() {
				this.$router.push('/zczl');
			},
			initEchart() {
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank =this.$store.getters.bank;
				// 获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				//从后台获取json数据
				let params = {
					startTime: "",
					endTime: _this.endTime,
					bankName: _this.bank,
				};
				getEchartsQjgl(params).then((res) => {
					var getEchartsQjgl = JSON.stringify(res);
					_this.xDate = res.data.data.日期;
					_this.defectiveRateData = res.data.data.不良率;
					_this.theLoanData = res.data.data.贷款;
					_this.depositData = res.data.data.存款;
					_this.assetsData = res.data.data.资产;
					_this.liabilitiesData = res.data.data.负债;
					_this.RuleData = res.data.data.dataRules;
					// 编写echart参数
					let option = {
						backgroundColor: '', //背景颜色透明
						title: {
							text: "全辖概览",
							textStyle: {
								//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
								fontSize: 18,
								color: "#4682B4"
							}
						},
						tooltip: {
							trigger: "axis"
						},
						legend: {
							icon: 'roundRect', //icon为圆角矩形
							data: ["存款", "贷款", "资产", "负债", "不良率"]
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
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
						xAxis: {
							// triggerEvent: true,
							type: "category",
							boundaryGap: true,
							data: _this.xDate
						},
						yAxis: [{
							type: "value",
							name: "余额",
							axisLabel: {
								formatter: "{value} 亿元"
							}},
							
							{
								type: 'value',
								name: '百分比',
								axisLabel: {
									formatter: function(value) 
									{ 
									return (value*100).toFixed(2)+"%"; 
									} 
								}
							}]
						,
						series: [{
								name: "存款",
								type: "line",
								stack: "总量",
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
								smooth: true, //这句就是让曲线变平滑的 ，
								data: this.depositData
							},
							{
								name: "贷款",
								type: "line",
								stack: "总量1",
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
								smooth: true, //这句就是让曲线变平滑的 
								data: this.theLoanData
							},
							{
								name: "资产",
								type: "line",
								stack: "总量2",
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

								smooth: true, //这句就是让曲线变平滑的 
								data: this.assetsData
							},
							{
								name: "负债",
								type: "line",
								stack: "总量3",
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
								smooth: true, //这句就是让曲线变平滑的 
								data: this.liabilitiesData
							},
							{
								name: "不良率",
								type: "line",
								yAxisIndex: 1,
								stack: "总量4",
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
								smooth: true, //这句就是让曲线变平滑的 
								data: this.defectiveRateData
							}
						]
					};
					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});
					chart.on("click", function(param) {
						var time = param.name; //得到时间月份
						var seriesName = param.seriesName;
						_this.dialogVisible=!_this.dialogVisible;
						if(time=="最大值"||time=="最小值"){
							console.log(param.data.coord[0]);
							time = _this.xDate[param.data.coord[0]];
						}
						
						if(seriesName=="不良率"){
							// _this.hztjTitle = '近12期不良贷款额柱状图';
							_this.hztj();
						}else{
							_this.hztjTitle = seriesName+'构成柱状图';
						}
						_this.active=seriesName;
						_this.date = time;
						// console.log(seriesName+"--------"+time+","+ JSON.stringify(param.data)+","+ param.dataIndex);
					});
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.ganlan {
		margin-top: 10px;
	}

	.ganlann {
		margin-top: 0px;
	}
	
	.childbox{
		border:0px;
		box-shadow:0px 0px 0px 0px red;
	}
	
	.mybox{
		width:100%;
		margin-top:50px;
	}
</style>
