<template>
	<el-form :model="ruleForm" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		<h3 class="title">系统登入</h3>
		<el-form-item prop="account">
			<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账户"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		<el-form-item style="width:100%;">
			<el-button type="primary" style="width:100%;" @click.native.prevent="Submit" :loading="logining">登录</el-button>
			<!-- <el-button @click.native.prevent="handleReset2">重置</el-button> -->
		</el-form-item>
	</el-form>
</template>

<script>
	import {
		requestLogin
	} from '../api/api';
	
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				logining: false,
				ruleForm: {
					account: '',
					checkPass: '',
				},
				rules2: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						//{ validator: validaePass }
					],
					checkPass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						//{ validator: validaePass2 }
					]
				},
				checked: true
			};
		},
		methods: {
			//       handleReset2() {
			//         this.$refs.ruleForm2.resetFields();
			//       },
			Submit(ev) {
				console.log("login");
// 				console.log("----before:"+this.$store.getters.token);
// 				this.$store.dispatch("setToken","77886699");
// 				console.log("----change:"+this.$store.getters.token);
				var _this = this;
				_this.$refs.ruleForm2.validate((valid) => {
					if (valid) {
						//_this.$router.replace('/table');
						_this.logining = true;
						//NProgress.start();
						let loginParams = {
							username: _this.ruleForm.account,
							password: _this.ruleForm.checkPass
						};
						console.log(JSON.stringify(loginParams));
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("banks");
						sessionStorage.removeItem("times");
						sessionStorage.removeItem("bank");
						sessionStorage.removeItem("time");
						_this.$store.dispatch("deleteToken");
						requestLogin(loginParams).then(response => {
								console.log(JSON.stringify(response));
								_this.logining = false;
								//NProgress.done();
								let {
									message,
									code,
									data
								} = response;
								if (code !== "SUCCESS") {
									_this.$message({
										message: message,
										type: 'error'
									});
								} else {
									console.log("~~~~~~~~~~~~"+JSON.stringify(data));
									sessionStorage.setItem('user', JSON.stringify(data.user));
									sessionStorage.setItem('token', data.user.token);
									_this.$store.dispatch("setToken",data.user.token);
									_this.$router.push({
										path: '/home'
									});
								}
							})
							.catch(function(error) {
								console.log("---------login:"+JSON.stringify(error)+"--"+error.data.message);
								_this.$message({
									message: error.data.message,
									type: 'error'
								});
								_this.logining = false;
								return false;
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #06245A;
		// opacity: 0.9;
		border: 1px solid #06245A;
		box-shadow: 0 0 25px #03081C;
	
		.title {
			margin: 0px auto 40px auto;
			text-align: center;
			color: white;
		}

		.remember {
			margin: 0px 0px 35px 0px;
			color: white;
		}
	}

	.title {
		font-family: '微软雅黑';
	}
</style>
