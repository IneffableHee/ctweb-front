<template><div>


	<div class="status"  >
		<!-- <el-button type="primary" icon="el-icon-back" @click="back">返回</el-button> -->
		<span class="spanClass"><el-breadcrumb>
	      <el-breadcrumb-item >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button  type="text" >后置条件</el-button></el-breadcrumb-item>
	      <el-breadcrumb-item ><el-button  type="text"  @click="back">返回上一级目录</el-button></el-breadcrumb-item>
	    </el-breadcrumb></span>
    </div>
	<br/><br/>
	<div class="dashboard-editor-container" >
		<el-row :gutter="16">
			<el-col :xs="24" :sm="24" :lg="12">
				<div class="chart-wrapper">
					<daikuanZb90 />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12">
				<div class="chart-wrapper">
					<xingZengZB />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12">
				<div class="chart-wrapper">
					<daiKuanQXL />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12">
				<div class="chart-wrapper">
					<chuZhiBuLiangZB />
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>
<script>
	import daikuanZb90 from "./hztj/daiKuanZB90";
	import xingZengZB from "./hztj/xingZengZB";
	import daiKuanQXL from "./hztj/daiKuanQXL";
	import chuZhiBuLiangZB from "./hztj/chuZhiBuLiangZB";
	export default {
		components: {
			daikuanZb90,xingZengZB,daiKuanQXL,chuZhiBuLiangZB
		},
		methods: {
			 back() {
			  if (this.$route.query.noGoBack) {
			    this.$router.push({ path: '/dashboard' })
			  } else {
			    this.$router.go(-1)
			  }
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.status{  
    background: #4d4d4d none repeat scroll 0 0;  
	background:rgb(240, 242, 245);
    color: #e6e6e6;  
    height: 30px;  
    line-height: 30px;  
    width: 100%;  
    border-bottom: 1px solid #ccc;  
	text-align: right;
    position: fixed;  
    top: 70px;  
}
	.dashboard-editor-container {
		padding: 32px;
		background-color: rgb(240, 242, 245);
		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
	.github-corner:hover .octo-arm {
	  animation: octocat-wave 560ms ease-in-out
	}
</style>
