<template>
<div   style="height:420px;">

<el-row :gutter="0">
  <el-col :span="4"><div class="grid-content bg-purple"><p><b>资产：</b> </p></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"><p>xxx万元 </p></div></el-col>
   <el-col :span="8"><div class="grid-content bg-purple"><p>资产 </p></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><p>资产</p></div></el-col>
</el-row>
<el-row :gutter="0">
  <el-col :span="4"><div class="grid-content bg-purple"><p><b>负债：</b> </p></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"><p>xxx万元 </p></div></el-col>
   <el-col :span="8"><div class="grid-content bg-purple"><p>资产 </p></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><p>资产</p></div></el-col>
</el-row>
<el-row :gutter="0">
  <el-col :span="4"><div class="grid-content bg-purple"><p><b>存款：</b> </p></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"><p>xxx万元 </p></div></el-col>
   <el-col :span="8"><div class="grid-content bg-purple"><p><span class="el-icon-upload2" ></span>:xxx万元 </p></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><p>资产</p></div></el-col>
</el-row>
<el-row :gutter="0">
  <el-col :span="4"><div class="grid-content bg-purple"><p><b>贷款：</b> </p></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"><p>xxx万元 </p></div></el-col>
   <el-col :span="8"><div class="grid-content bg-purple"><p>资产 </p></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><p>资产</p></div></el-col>
</el-row>
<el-row :gutter="0">
  <el-col :span="4"><div class="grid-content bg-purple"><p><b>不良率：</b> </p></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"><p>xxx万元 </p></div></el-col>
   <el-col :span="6"><div class="grid-content bg-purple"><p>资产 </p></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"><p>资产</p></div></el-col>
</el-row>

</div>
</template>

<script>
  export default {
   
   
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
 
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 30px;
    text-align: center;
    padding: 1px 0;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
