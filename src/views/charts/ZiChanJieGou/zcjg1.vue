<template>

	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" v-show="echartShow" style="height:420px;"> </div> 
		<div v-show="noDataShow"     align="center">
			<p style=" margin-top: 30px;padding-bottom: 8px;color: #5E7382;">资产结构   当前期次无数据</p> 
			<!-- <p >1.请在后台确保相关取数文件是否已经上传 <span style="font-weight: bold;">.zip、.xls、.xlsx </span>尾的文件。</p>
		    <p class="info">2.当前视图取数规则为：<span style="font-weight: bold;">正常贷款额:GF01_II[C8]、关注贷款额：GF01_II[C9]、次级贷款额：GF01_II[C11]、可疑贷款额：GF01_II[C12]、损失贷款额：GF01_II[C13]</span>,确认取数规则是否正确。</p>
			 <p class="info">3.监管员是否为当前期次生成数据，数据生成后系统会自动校验和匹配机构名和期次。</p><br/><br/>
		    -->
			<br/><br/>
		 </div>
		<!-- 取数规则 -->
		<div style="width: 100%;">
			<el-dialog class="mybox" :append-to-body="true" :visible.sync="rulesDataVisible" @update:visible="newVisible => yuJingDialogVisible = newVisible">
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
		getZiChanJieGou
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
				data: null,
				startTime: "201901",
				endTime: "",
				bank: "",
				hztjTitle: null,
				rulesDataVisible: false,
				RuleData: [],
				echartShow:true,
				noDataShow:false
			};
		},
		methods: {
			hztj4zcjg() {
				this.$router.push('/zczl');
			},
			initEchart() {
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank = this.$store.getters.bank;
				// 获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				//从后台获取json数据
				let params = {
					time: _this.endTime,
					//endTime: _this.endTime,
					bankName: _this.bank,
				};
				getZiChanJieGou(params).then((res) => {
					console.log("----res-"+JSON.stringify(res))
					var data = res.data.data.dataList;
					_this.RuleData = res.data.data.dataRules;
					var myArr = new Array();
					for (var i = 0; i < data.length; i++) {
						var sss = {};
						sss.value = data[data.length - i - 1].dataValue;
						sss.name = data[data.length - i - 1].dataName.substring(0, 2);
						myArr[i] = sss;
					}
					_this.data = myArr;
					// 编写echart参数
					let option = {
						title: {
							text: "资产结构",
							textStyle: {
								//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
								fontSize: 18,
								color: "#4682B4"
							},
							x: "center"
						},
						tooltip: {
							trigger: "item",
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: "vertical",
							left: "left",
							data: ["损失", "关注", "次级", "可疑", "正常"]
						},
						//右上方提示
						toolbox: {
							show: true,
							feature: {
								dataView: {
									show: true,
									readOnly: true,
									optionToContent: function(opt) {
										let axisData = ["损失", "关注", "次级", "可疑", "正常"]; //坐标数据
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
												tdBodys += `<td>${ series[j].data[i].value}</td>`;
											}
											table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
											tdBodys = '';
										}
										table += '</tbody></table>';
										return table;
									}
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
						series: [{
							name: "数据占比",
							type: "pie",
							radius: "55%",
							// center: ["50%", "60%"],
							data: this.data,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: "rgba(0, 0, 0, 0.5)"
								}
							}
						}]
					};
					// 点击事件
					chart.on("click", function(param) {
						var name = param.name; //得到时间月份
						var value = param.value; // 当前节点的数据
						var index = param.dataIndex; // x轴的点
						var data = param.data; //获取线段名称
						var a = param.seriesName; //获取线段名称
						// console.info(name + "\n" + value + "\n" + index + "\n" + data + "\n" + a);
						// router.plus.push();
						// this.router.push('zczl');
						_this.hztj4zcjg();
					});
					// 设置图表的参数
					chart.setOption(option);
					window.addEventListener("resize", function() {
						chart.resize();
					});
				}).catch(error => {
					_this.echartShow=false;
					_this.noDataShow=true;
				});
			}
		}
	};
</script>



