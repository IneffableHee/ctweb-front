<template>
  <div style="height:630px;">
      <span style="color:#4682B4;font-size:18px"><b>房地产供求情况</b></span>
      <br/>
         <br/>
         <br/>
    <el-row :gutter="12">
      <el-col
        :xs="24"
        :sm="24"
        :lg="24"
      >
        <div class="chart-wrapper">
         <gongqiu />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="24"
      >
        <div class="chart-wrapper">
           <xuqiu />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import gongqiu from "./gongqiu";
import xuqiu from "./xuqiu";

export default {
  name: "DashboardAdmin",
  components: {
      gongqiu,
      xuqiu
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
