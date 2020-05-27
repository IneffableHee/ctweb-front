<template>
	<div align="right" style="height:470px;">
		<el-table  ref="filterTable" :data="tableData" style="width: 100%">
			<el-table-column type="index" width="70" label="序号"></el-table-column>
			<el-table-column prop="customerType" label="客户类型">
			</el-table-column>
			<el-table-column prop="customeName" label="客户名称">
			</el-table-column>
			<el-table-column prop="fxzh" label="风险暴露总和(万元)">
			</el-table-column>
			<el-table-column prop="yjzbjeb" :formatter="formatYjzbjeb" label="占上一级资本额比例">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		tableByName
	} from '../../../api/api';
	export default {
		data() {
			return {
				formVisible:false,
				tableData:[],
				time :'',
				bank:{ },
			}
		},
		methods: {
			getJiZhongDu(){
				var _this = this;
				let params = {
					time:  this.$store.getters.time,
					bankName: this.$store.getters.bank,
					typeName:'jzd'
				};
				tableByName(params).then((res) => {
					console.log(JSON.stringify(res))
					_this.tableData = res.data.data;
				});
			},
			//状态显示转换
			formatYjzbjeb: function(row, column) {
				return  (row.yjzbjeb*100).toFixed(2)+"%"; 
			},
			formShow(){
				this.formVisible = true
			},
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			formatter(row, column) {
				return row.address;
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			}
		},
		 mounted() { 
			 this.getJiZhongDu();
		 }
	}
</script>
<style>
	.customWidth {
		width: 80%;
		 
	}
</style>