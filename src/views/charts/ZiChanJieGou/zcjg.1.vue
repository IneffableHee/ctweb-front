<template>

	<div class="content-box">
		<!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
		<!-- echart容器div必须设置高度，否则不显示 -->
		<div ref="echart" style="height:420px;"></div>
				<div style="width: 100%;">
			<el-dialog class="mybox" :title="hztjTitle" :visible.sync="dialogVisible" @update:visible="newVisible => dialogVisible = newVisible">
				<span>
					<el-row>
						<el-card  >
							<zczl  />
						</el-card>
						 
					</el-row>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">返回</el-button>
					<!--  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
				</span>
			</el-dialog>
		</div>
		<!-- <router-link to="zczl">table</router-link> -->
	</div>

</template>
<script>
	import zczl from "./zczl.vue";
		import {
		getZiChanJieGou
	} from '../../../api/api';
	export default {
			components: {
			zczl
		},
		mounted() {
			this.$nextTick(() => {
				this.initEchart();
			});
			},
			data() {
			return {
			dialogVisible: false,
			data:null,
			startTime:"201901",
			endTime:"",
			bank:"",
			// date:null,
			// active:null,
			hztjTitle:null,
		};
			},
		
		methods: {
			initEchart() {
				console.log("initEchart-----zcjg------");
				var _this = this;
				_this.endTime = this.$store.getters.time;
				_this.bank =this.$store.getters.bank;
				console.log("bank:"+_this.bank+",time:"+_this.endTime);
				// 获取DOM节点并初始化
				let chart = this.$echarts.init(this.$refs.echart);
				//从后台获取json数据
				let params = {
					time: _this.startTime,
					// endTime: _this.endTime,
					bankName: _this.bank,
				};
				 getZiChanJieGou(params).then((res) => {
				 	console.log("从后台获取的数据zcjg:" + JSON.stringify(res));
				 	var data = res.data.data;
					var myArr = new Array();
				 	for(var i = 0; i<data.length;i++){
						var sss ={};
						sss.value = data[data.length-i-1].dataValue;
						sss.name = data[data.length-i-1].dataName.substring(0,2);
						myArr[i] = sss;
						}
					_this.data = myArr;
					
				// 编写echart参数
				let option = option = {
					 
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
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['正常', '关注', '次级', '可疑', '损失']
					},
					series: [{
							name: '访问来源',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '30%'],

							label: {
								normal: {
									position: 'inner'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:this.data
						},
						{
							name: '概述',
							type: 'pie',

							radius: ['40%', '55%'],
							label: {
								normal: {
									formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
									backgroundColor: '#eee',
									borderColor: '#aaa',
									borderWidth: 1,
									borderRadius: 4,
									// shadowBlur:3,
									// shadowOffsetX: 2,
									// shadowOffsetY: 2,
									// shadowColor: '#999',
									// padding: [0, 7],
									rich: {
										a: {
											color: '#999',
											lineHeight: 22,
											align: 'center'
										},
										// abg: {
										//     backgroundColor: '#333',
										//     width: '100%',
										//     align: 'right',
										//     height: 22,
										//     borderRadius: [4, 4, 0, 0]
										// },
										hr: {
											borderColor: '#aaa',
											width: '100%',
											borderWidth: 0.5,
											height: 0
										},
										b: {
											fontSize: 16,
											lineHeight: 33
										},
										per: {
											color: '#eee',
											backgroundColor: '#334455',
											padding: [2, 4],
											borderRadius: 2
										}
									}
								}
							},
							data:this.data
						}
					]
				};
				// 点击事件
				chart.on("click", function(param) {
					var name = param.name; //得到时间月份
					var value = param.value; // 当前节点的数据
					var index = param.dataIndex; // x轴的点
					var data = param.data; //获取线段名称
					var a = param.seriesName; //获取线段名称
					console.info(name + "\n" + value + "\n" + index + "\n" + data + "\n" + a);
                     _this.dialogVisible=!_this.dialogVisible;
				});
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
