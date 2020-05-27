<template>
	<div class="dashboard-editor-container">
		<!-- kai_w_x -->
		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="24">
				<div class="chart-wrapper">
					<qjgl></qjgl>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24">
				<div class="chart-wrapper">
					<zcjg1 />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12"  v-if=' bank.indexOf("都匀分行")==-1 && bank.indexOf("汇总")==-1 && bank.indexOf("黔南分行")==-1  && bank.indexOf("贵")==-1  && bank.indexOf("农发行")==-1  && bank.indexOf("邮储银行")==-1'>
				<div class="chart-wrapper">
					<chongZuLv />
				</div>
			</el-col>
		<!-- 	<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("村镇银行")!=-1 || bank.indexOf("联社")!=-1 || bank.indexOf("农商")!=-1'>
				<div class="chart-wrapper">
					<chongZuLv />
				</div>
			</el-col> -->
         <!-- <el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("村镇银行")!=-1 || bank.indexOf("农商")!=-1 || bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<BoBeiFuGaiLv />
				</div>
			</el-col> -->
			<el-col :xs="24" :sm="24" :lg="12" v-if=' bank.indexOf("都匀分行")==-1 &&  bank.indexOf("汇总")==-1 && bank.indexOf("黔南分行")==-1  && bank.indexOf("贵")==-1 && bank.indexOf("农发行")==-1  && bank.indexOf("邮储银行")==-1'>
				<div class="chart-wrapper">
					<BoBeiFuGaiLv />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("农商")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<liRunLv />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("农商")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<ShouRuBi />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("国丰村镇银行")!=-1|| bank.indexOf("融通村镇银行")!=-1 ||bank.indexOf("恒升村镇银行")!=-1|| bank.indexOf("富民村镇银行")!=-1 || bank.indexOf("农商")!=-1 || bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<JiZhongDu />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("全辖")==-1&&bank.indexOf("村镇银行")==-1&&bank.indexOf("城商行")==-1 && bank.indexOf("农发行")==-1 && bank.indexOf("农合")==-1 '>
				<div class="chart-wrapper">
					<BiaoWaiYeWu />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("全辖")==-1 && bank.indexOf("农合")==-1 && bank.indexOf("村镇银行汇总")==-1'>
				<div class="chart-wrapper">
					<BuLiangQingShou />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("村镇银行")!=-1'>
				<div class="chart-wrapper">
					<znzx />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='  bank.indexOf("农合")!=-1 '>
				<div class="chart-wrapper">
					<sheNongDaiKuan />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("贵阳银行")!=-1 || bank.indexOf("贵州银行")!=-1 || bank.indexOf("农合")!=-1 || bank.indexOf("城商行")!=-1'>
				<div class="chart-wrapper">
					<fangdichan />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("大型国有")!=-1||bank.indexOf("邮储")!=-1||bank.indexOf("工商银行")!=-1|| bank.indexOf("建设银行")!=-1|| bank.indexOf("交通银行")!=-1|| bank.indexOf("农业银行")!=-1|| bank.indexOf("中国银行")!=-1 '>
				<div class="chart-wrapper">
					<lglsqk />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("村镇银行汇总")!=-1'>
				<div class="chart-wrapper">
					<sheNongLiangGeBuDiYu />
				</div>
			</el-col>
			
			<!-- <el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("城商行")!=-1||bank.indexOf("贵阳银行")!=-1|| bank.indexOf("贵州银行")!=-1  '> -->
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖")!=-1||  bank.indexOf("贵阳银行")!=-1|| bank.indexOf("贵州银行")!=-1  '>
				<div class="chart-wrapper">
					<difangzhengfu />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("城商行")!=-1|| bank.indexOf("贵阳银行")!=-1|| bank.indexOf("贵州银行")!=-1 '>
				<div class="chart-wrapper">
					<weiTuoDaiKuan />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("农发行")!=-1 '>
				<div class="chart-wrapper">
					<pengQuGaiZhao />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<quanXiaYuQi90Tian />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<quanXiaTiHuiDai />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<daiKuanZB90 /> 
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<daiKuanQXL />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<xiaoWeiQiYe />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<puHuiJingRong />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("全辖机构汇总")!=-1 '>
				<div class="chart-wrapper">
					<quanXiaFangDiChan />
				</div>
			</el-col>

			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("农商行")!=-1 || bank.indexOf("农合机构")!=-1 ||bank.indexOf("村镇银行")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<zhiChanChongZhuLv />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" v-if='bank.indexOf("农商行")!=-1 || bank.indexOf("农合机构")!=-1 ||bank.indexOf("村镇银行")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<gangGanLv />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("农商行")!=-1 || bank.indexOf("农合机构")!=-1 ||bank.indexOf("村镇银行")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<liuDongXingBiLi />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("农商行")!=-1 || bank.indexOf("农合机构")!=-1 ||bank.indexOf("村镇银行")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<heXinFuZhaiBiLi />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("农商行")!=-1 || bank.indexOf("农合机构")!=-1 ||bank.indexOf("村镇银行")!=-1||bank.indexOf("联社")!=-1'>
				<div class="chart-wrapper">
					<liuDongXinQueKouLv />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" v-if='bank.indexOf("农商行")!=-1|| bank.indexOf("国丰村镇银行")!=-1|| bank.indexOf("融通村镇银行")!=-1 ||bank.indexOf("恒升村镇银行")!=-1|| bank.indexOf("富民村镇银行")!=-1 || bank.indexOf("农商")!=-1 || bank.indexOf("联社")!=-1 '>
				<div class="chart-wrapper">
					<youZhiZhiChanLiuDongXinLv />
				</div>
			</el-col>
			<!-- <el-col :xs="24" :sm="12" :lg="24">
				<div class="chart-wrapper">
					<fangdichanggongqiu />
				</div>
			</el-col> -->
			<el-col :xs="24" :sm="12" :lg="24">
				<div style="width: 100%;height: 60px;"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import fangdichanggongqiu from "./fangdichangongqiu/fangdichanggongqiu";
	import sheNongDaiKuan from "./sheNongDaiKuan/sheNongDaiKuan";
	import fangdichan from "./fangDiChang/fangDiChang";
	import sheNongLiangGeBuDiYu from "./sheNongLiangGeBuDiYu/sheNongLiangGeBuDiYu";
	import znzx from "./znzx/znzx";
	import qjgl from "./QuanXiaGaiLan/home";
	import lglsqk from "./LiangGaoLiangSheng/lglsqk";
	import zcjg from "./ZiChanJieGou/zcjg";
	import zcjg1 from "./ZiChanJieGou/zcjg1";
	import ChongZuLv from "./SunShiZhunBeiCCL/chongZuLv";
	import BoBeiFuGaiLv from "./SunShiZhunBeiCCL/boBeiFuGaiLv";
	import JiZhongDu from "./jizhongdu/jiZhongDu";
	import ShouRuBi from "./shouRuBi/shouRuBi";
	import liRunLv from "./shouRuBi/liRunLv";
	import weiTuoDaiKuan from "./weiTuoDaiKuan/weiTuoDaiKuan";
	import BiaoWaiYeWu from "./biaoWai/biaoWaiYeWu";
	import BuLiangQingShou from "./buLiangQingShou/buLiangQingShou";
	import difangzhengfu from "./difangzhengfu/difangzhengfu";
	import pengQuGaiZhao from "./pengQuGaiZhao/pengQuGaiZhao";
	import daiKuanZB90 from "./ZiChanJieGou/hztj/daiKuanZB90";
	import daiKuanQXL from "./ZiChanJieGou/hztj/daiKuanQXL";
	import xiaoWeiQiYe from "./xiaoWeiQiYe/xiaoWeiQiYe";
	import puHuiJingRong from "./puHuiJingRong/puHuiJingRong";
	import quanXiaFangDiChan from "./quanXiaFangDiChan/quanXiaFangDiChan";
	import quanXiaYuQi90Tian from "./quanXiaYuQi90Tian/quanXiaYuQi90Tian";
	import quanXiaTiHuiDai from "./quanXiaTiHuiDai/quanXiaTiHuiDai";
	import zhiChanChongZhuLv from "./nongHeCunZhen/zhiChanChongZhuLv";
	import gangGanLv from "./nongHeCunZhen/gangGanLv";
	import liuDongXingBiLi from "./nongHeCunZhen/liuDongXingBiLi";
	import heXinFuZhaiBiLi from "./nongHeCunZhen/heXinFuZhaiBiLi";
	import liuDongXinQueKouLv from "./nongHeCunZhen/liuDongXinQueKouLv";
	import youZhiZhiChanLiuDongXinLv from "./nongHeCunZhen/youZhiZhiChanLiuDongXinLv";
	export default {
		name: "DashboardAdmin",
		data() {
			return {
				bank: null,
				institution: "惠水农商行"
			};
		},
		components: {
			zcjg1,
			ChongZuLv,
			BoBeiFuGaiLv,
			JiZhongDu,
			ShouRuBi,
			liRunLv,
			BiaoWaiYeWu,
			BuLiangQingShou,
			sheNongLiangGeBuDiYu,
			weiTuoDaiKuan,
			pengQuGaiZhao,
			qjgl,
			difangzhengfu,
			zcjg,
			fangdichanggongqiu,
			sheNongDaiKuan,
			fangdichan,
			znzx,
			lglsqk,
			daiKuanZB90,
			daiKuanQXL,
			xiaoWeiQiYe,
			puHuiJingRong,
			quanXiaFangDiChan,
			quanXiaYuQi90Tian,
			quanXiaTiHuiDai,
			zhiChanChongZhuLv,
			gangGanLv,
			liuDongXingBiLi,
			heXinFuZhaiBiLi,
			liuDongXinQueKouLv,
			youZhiZhiChanLiuDongXinLv
		},
		methods: {
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type];
			}
		},
		mounted() {
			this.bank = this.$store.getters.bank;
		},
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-editor-container {
		padding: 32px;
		background-color: rgb(240, 242, 245);

		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
</style>
