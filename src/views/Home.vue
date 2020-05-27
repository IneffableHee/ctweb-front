<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="4" class="dep">
				<div style="padding-left: 20px;">{{dpName}}</div>
			</el-col>
			<el-col :span="18" class="title">
				<div style="float: left;padding-left: 20px;">{{sysName}}</div>
				<div class="menu" style="float: left; width: 400px;">
					<!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="1">处理中心</el-menu-item>
					  <el-submenu index="2">
						<template slot="title">我的工作台</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
						<el-submenu index="2-4">
						  <template slot="title">选项4</template>
						  <el-menu-item index="2-4-1">选项1</el-menu-item>
						  <el-menu-item index="2-4-2">选项2</el-menu-item>
						  <el-menu-item index="2-4-3">选项3</el-menu-item>
						</el-submenu>
					  </el-submenu>
					  <el-menu-item index="3" disabled>消息中心</el-menu-item>
					  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
					</el-menu> -->
					<ul>
						<li @click='dialogFormVisible = true'>{{bank}}</li>
						<li @click='timeDialogFormVisible = true'>{{time}}期</li>
					</ul>
				</div>

			</el-col>
			<el-col :span="2" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main" v-if="showMain1&showMain2">
			<section class="content-container">
				<transition name="fade" mode="out-in">
					<router-view :key="flash"></router-view>
				</transition>
			</section>
		</el-col>

		<!-- <el-dialog title="机构选择" :visible.sync="dialogFormVisible" class = "jigou">
			<el-row>
				<span v-for="item in banks" >
					<el-button class="ebtn" type="primary" @click="chooseBank(item)">{{item}}</el-button>
				</span>
			</el-row>
		</el-dialog> -->

		<el-dialog center="true" customClass="customWidth" class="mydialog" title="机构选择" :visible.sync="dialogFormVisible">
			<div style="margin-top: 20px;margin-left:20px;width: 1150px;">
				<el-row>
					<el-button class="pbtn" type="primary" @click="chooseBank($event)">全辖机构汇总</el-button>
				</el-row>
				<el-row style="margin-top: 10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">城商行汇总</el-button>
					</el-col>
					<el-col :span="21">
						<el-button class="ebtn" type="success" @click="chooseBank($event)">贵阳银行黔南分行</el-button>
						<el-button class="ebtn" type="success" @click="chooseBank($event)">贵州银行黔南分行</el-button>
					</el-col>
				</el-row>

				<el-row style="margin-top: -10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">大型国有汇总</el-button>
					</el-col>
					<el-col :span="21" class="adp">
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">工商银行都匀分行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">建设银行黔南分行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">交通银行黔南分行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">农业银行黔南分行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">中国银行都匀分行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">邮储银行黔南分行</el-button>
					</el-col>
				</el-row>

				<el-row style="margin-top: -10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">农合机构汇总</el-button>
					</el-col>
					<el-col :span="21">
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">都匀农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">独山农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">福泉农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">惠水农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">荔波农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">瓮安农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">龙里农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">平塘农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">三都农商行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">贵定联社</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">长顺联社</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">罗甸联社</el-button>
					</el-col>
				</el-row>
				<el-row style="margin-top: -10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">村镇银行汇总</el-button>
					</el-col>
					<el-col :span="21">
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">都匀融通村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">独山富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">福泉富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">贵定恒升村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">惠水恒升村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">荔波富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">龙里国丰村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">罗甸发展村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">平塘富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">三都富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">瓮安富民村镇银行</el-button>
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">长顺富民村镇银行</el-button>
					</el-col>
				</el-row>
				<!-- 	<el-row style="margin-top: -10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">邮储银行</el-button>
					</el-col>
					<el-col :span="21">
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)" style="width: 150px;;">邮储银行黔南州分行</el-button>
					</el-col>
				</el-row> -->
				<el-row style="margin-top: -10px;">
					<el-col :span="3">
						<el-button class="pbtn" type="primary" @click="chooseBank($event)">政策性银行</el-button>
					</el-col>
					<el-col :span="21">
						<el-button class="ebtn" type="primary" plain @click="chooseBank($event)">农发行黔南分行</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>

		<el-dialog title="期次选择" :visible.sync="timeDialogFormVisible">
			<el-row>
				<span v-for="time in times">
					<el-button class="ebtn" type="primary" plain @click="chooseTime(time)">{{time}}</el-button>
				</span>
			</el-row>
		</el-dialog>
	</el-row>
</template>

<script>
	import {
		getBankList,
		getTimeList
	} from '../api/api';
	export default {
		data() {
			return {
				dpName: '黔南银监分局',
				sysName: '黔南银监分局金融CT大数据监管平台',
				banks: null,
				times: null,
				bank: null,
				time: null,
				sysUserName: '刘德华',
				dialogFormVisible: false,
				timeDialogFormVisible: false,
				sysUserAvatar: require('../assets/logout.png'),
				showMain1: false,
				showMain2: false,
				flash: 1,
				form: {
					name: 'Admin',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function(a, b) {},
			//退出登录
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			chooseBank(event) {
				this.$message.closeAll();
				var btnBank = event.currentTarget.innerText;
				console.log("--banks-" + this.banks)
				console.log("--btnBank-" + btnBank)
				if (this.banks.indexOf(btnBank) != -1) {
					this.bank = btnBank;
					this.dialogFormVisible = this.dialogFormVisible == true ? false : false;
					this.$store.dispatch("setBank", this.bank);
					this.flash++;
					console.log("VVVVVVVVVVVvVVV  time:" + this.time + ",bank:" + this.bank);
				} else {
					this.$message({
						message: btnBank + "当前期次无数据!",
						type: 'error',
						showClose: true,
					});
				}
			},
			chooseTime(time) {
				this.time = time;
				this.timeDialogFormVisible = this.timeDialogFormVisible == true ? false : false;
				this.$store.dispatch("setTime", this.time);
				this.flash++;
				console.log("WWWWWWWWWWWWW  time:" + this.time + ",bank:" + this.bank);
			},

		},
		mounted() {
			var _this = this;
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.userRealName || '';
				// this.sysUserAvatar = user.avatar || '';
			};

			if (this.$store.getters.bank) {
				getBankList().then((res) => {
					var data = res.data.data;
					if (data.indexOf(this.$store.getters.bank)) {
						_this.bank = this.$store.getters.bank;
					} else {
						_this.bank = data[0];
					}
					_this.banks = data;
					_this.$store.dispatch("setBanks", JSON.stringify(data));
					_this.showMain1 = true;
					console.log("从后台获取的数据---------------bank:" + data);
				});
			} else {
				getBankList().then((res) => {
					var data = res.data.data;
					_this.bank = data[0];
					_this.banks = data;
					_this.$store.dispatch("setBanks", JSON.stringify(data));
					_this.$store.dispatch("setBank", data[0]);
					_this.showMain1 = true;
					console.log("从后台获取的数据---------------bank:" + data);
				});
			}

			if (this.$store.getters.time) {
				getTimeList().then((res) => {
					var data = res.data.data;
					if (data.indexOf(this.$store.getters.time)) {
						_this.time = this.$store.getters.time;
					} else {
						_this.time = data[0];
					}
					_this.times = data.reverse();
					_this.$store.dispatch("setTimes", JSON.stringify(data));
					_this.showMain2 = true;
					console.log("从后台获取的数据---------------time:" + data);
				});
			} else {
				getTimeList().then((res) => {
					var data = res.data.data;
					_this.time = data[0];
					_this.$store.dispatch("setTime", data[0]);
					_this.times = data.reverse();
					_this.$store.dispatch("setTimes", JSON.stringify(data));
					_this.showMain2 = true;
					console.log("从后台获取的数据---------------time:" + data);
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.container {
		// background-color: #03081C;
		// background-color: rgb(0, 11, 56);
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;

		.header {
			height: 70px;
			line-height: 70px;
			background: #000B38;
			// background: rgb(240, 242, 245);
			border-radius: 0px;
			color: rgb(33, 255, 227);

			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;

				.userinfo-inner {
					cursor: pointer;
					color: #fff;
					font-size: 16px;

					img {
						width: 30px;
						height: 25px;
						margin: 22px 0px 10px 10px;
						float: right;
					}
				}
			}

			.dep {
				//width:230px;
				height: 60px;
				font-size: 20px;
				padding-left: 20px;
				padding-right: 20px;
				color: #9DC8C8;
			}

			.tools {
				padding: 0px 23px;
				width: 14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}

		.main {
			display: flex;
			background-color: #03081C;
			height: 100%;
			position: absolute;
			top: 70px;
			bottom: 0px;
			overflow: hidden;
			border-radius: 0px;

			aside {
				flex: 0 0 230px;
				width: 230px;

				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu {
					height: 100%;
				}

			}

			.menu-expanded {
				flex: 0 0 230px;
				width: 230px;
				background-color: #EEF1F6;
				// background-color: red;
			}

			.content-container {
				background-color: white;
				// background: #f1f2f7;
				flex: 1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				// overflow-y: scroll;
				overflow: auto;
				padding: 0px;

				.breadcrumb-container {
					background-color: white;

					//margin-bottom: 15px;
					.breadcrumb-inner {
						float: right;
						padding-right: 2px;
					}
				}

				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}

	.title {
		height: 70px;
		line-height: 70px;
		text-align: center;
		font-size: 24px;
		padding-left: 10%;
		color: rgb(33, 255, 226);
	}

	.menu ul {
		/* 清除ul标签的默认样式 */
		width: auto;
		/*宽度也改为自动*/
		list-style-type: none;
		white-space: nowrap;
		overflow: hidden;
		margin-left: 15%;
		/* margin-top: 0;          */
		padding: 0;
		margin-top: 5px;
	}

	.menu li {
		float: left;
		/* 使li内容横向浮动，即横向排列  */
		margin-right: 20px;
		/* 两个li之间的距离*/
		position: relative;
		overflow: hidden;
		color: #519D9E;
		font-size: 18px;
		font-weight: bold;
		cursor: pointer;
	}

	.menu li:hover {
		color: rgb(33, 255, 226);
	}

	.ebtn {
		margin-bottom: 10px;
		margin-left: 20px;
		width: 140px;
	}

	.ebtn {
		color: #20A0FF;
		background: none;
		border-color: #20A0FF;
	}

	.ebtn:hover {
		color: #FFF;
		background: #4fc3f7;
		border-color: #FFF;
	}

	.ebtn:active {
		background: #3a8ee6;
		border-color: #3a8ee6;
		color: #FFF;
	}

	.aop {
		padding-left: 20px;
	}

	.pbtn {
		width: 140px;
	}

	.mydialog {
		width: 100%;
		height: 800px;

	}
</style>
