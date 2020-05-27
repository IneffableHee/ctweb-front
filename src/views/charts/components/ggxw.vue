<template>
  <div style="height:595px; ">
    <!--<el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button -->
<h3 style="color:#4682B4;font-size:18px" >高管人员负债情况</h3><hr/>
    <el-table
      ref="filterTable"
      :data="tableData"
      height="560"
      style="width: 100%;"
    >
      <!--
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="100"
      column-key="date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
     -->
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="job"
        label="职务"
        sortable
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="org_name"
        label="机构名称"
        sortable
        width="260"
      >
      </el-table-column>
      <el-table-column
        prop="loan_amount"
        label="贷款金额"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="loan_num"
        label="贷款笔数"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="loan_rate"
        label="贷款利率"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="guaranty_style"
        label="主要担保方式"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="interest_date"
        label="起息日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="expire_date"
        label="到期日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_date"
        label="逾期日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_amount"
        label="贷款逾期余额"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="debitInterest_amount"
        label="表外欠息余额"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="形态"
        width="120"
        :filters="[{ text: '正常', value: '正常' }, { text: '不正常', value: '不正常' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '正常' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
         {org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"伍义    "    ,  job:"副行长               ",     loan_rate:"4.900000",	loan_amount:"1340000.00 "         ,interest_date:"20171206	",expire_date:"20371114",	overdue_date:"20371115",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"王刚    "    ,  job:"副行长               ",     loan_rate:"4.749960",	loan_amount:"1250000.00 "         ,interest_date:"20161014	",expire_date:"20191013",	overdue_date:"20191014",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"覃继懂  "    ,  job:"行长                 ",     loan_rate:"5.390000",	loan_amount:"1060000.00 "         ,interest_date:"20180731	",expire_date:"20330507",	overdue_date:"20330508",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"张生才  "    ,  job:"监事长               ",     loan_rate:"4.749960",	loan_amount:"1050000.00 "         ,interest_date:"20161011	",expire_date:"20191010",	overdue_date:"20191011",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"叶维斌  "    ,  job:"部室正职             ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20190117	",expire_date:"20240116",	overdue_date:"20240117",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"李友能  "    ,  job:"监事长               ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20170610	",expire_date:"20200609",	overdue_date:"20200610",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"李彬    "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20170512	",expire_date:"20220511",	overdue_date:"20220512",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"部门经理             ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20180104	",expire_date:"20230103",	overdue_date:"20230104",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"李彬    "    ,  job:"                     ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20170512	",expire_date:"20220511",	overdue_date:"20220512",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"张金财  "    ,  job:"部室主任             ",     loan_rate:"3.920000",	loan_amount:"1000000.00 "         ,interest_date:"20160509	",expire_date:"20240508",	overdue_date:"20240509",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"1000000.00 "         ,interest_date:"20180104	",expire_date:"20230103",	overdue_date:"20230104",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"周杨    "    ,  job:"分理处正职           ",     loan_rate:"4.749960",	loan_amount:"970000.00  "         ,interest_date:"20161018	",expire_date:"20191017",	overdue_date:"20191018",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"向科勇  "    ,  job:"分理处正职           ",     loan_rate:"4.750000",	loan_amount:"950000.00  "         ,interest_date:"20190120	",expire_date:"20210117",	overdue_date:"20210118",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"向科勇  "    ,  job:"行社一级部门正职     ",     loan_rate:"4.750000",	loan_amount:"950000.00  "         ,interest_date:"20190120	",expire_date:"20210117",	overdue_date:"20210118",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"黄远凤  "    ,  job:"行社一级部门正职     ",     loan_rate:"4.749960",	loan_amount:"940000.00  "         ,interest_date:"20161014	",expire_date:"20191013",	overdue_date:"20191014",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"信用社主任           ",     loan_rate:"4.900000",	loan_amount:"940000.00  "         ,interest_date:"20180109	",expire_date:"20271204",	overdue_date:"20271205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"部门经理             ",     loan_rate:"4.900000",	loan_amount:"940000.00  "         ,interest_date:"20180109	",expire_date:"20271204",	overdue_date:"20271205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"黎廷国  "    ,  job:"                     ",     loan_rate:"3.920000",	loan_amount:"930000.00  "         ,interest_date:"20160511	",expire_date:"20240510",	overdue_date:"20240511",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   }, 
{org_name:"贵定县农村信用合作联社                          ",  name:"王成明  "    ,  job:"信用社正职           ",     loan_rate:"4.350000",	loan_amount:"865000.00  "         ,interest_date:"20180323	",expire_date:"20190322",	overdue_date:"20190323",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"涂畅    "    ,  job:"副主任               ",     loan_rate:"4.165000",	loan_amount:"860000.00  "         ,interest_date:"20120813	",expire_date:"20270810",	overdue_date:"20270811",debitInterest_amount:"2757.82 "    ,overdue_amount:"2757.82  "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"杨远燕  "    ,  job:"工会主席             ",     loan_rate:"4.750000",	loan_amount:"860000.00  "         ,interest_date:"20181026	",expire_date:"20211025",	overdue_date:"20211026",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"刘齐    "    ,  job:"                     ",     loan_rate:"4.900000",	loan_amount:"830000.00  "         ,interest_date:"20160425	",expire_date:"20240424",	overdue_date:"20240425",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"汪娉    "    ,  job:"部室经理             ",     loan_rate:"3.800000",	loan_amount:"820000.00  "         ,interest_date:"20160128	",expire_date:"20210127",	overdue_date:"20210128",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"张元杰  "    ,  job:"部室经理             ",     loan_rate:"3.920000",	loan_amount:"820000.00  "         ,interest_date:"20160425	",expire_date:"20240424",	overdue_date:"20240425",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"李正博  "    ,  job:"支行行长             ",     loan_rate:"4.410000",	loan_amount:"800000.00  "         ,interest_date:"20130627	",expire_date:"20210626",	overdue_date:"20210627",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"李程    "    ,  job:"                     ",     loan_rate:"4.410000",	loan_amount:"800000.00  "         ,interest_date:"20130523	",expire_date:"20210522",	overdue_date:"20210523",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州独山农村商业银行股份有限公司                ",  name:"杨宏雷  "    ,  job:"副行长               ",     loan_rate:"4.750000",	loan_amount:"800000.00  "         ,interest_date:"20180829	",expire_date:"20210828",	overdue_date:"20210829",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   }, 
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"杨国华  "    ,  job:"部室正职             ",     loan_rate:"4.752000",	loan_amount:"800000.00  "         ,interest_date:"20170921	",expire_date:"20220919",	overdue_date:"20220920",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"李翔    "    ,  job:"部室正职             ",     loan_rate:"4.900000",	loan_amount:"800000.00  "         ,interest_date:"20130201	",expire_date:"20230201",	overdue_date:"20230202",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"石坚    "    ,  job:"信用社正职           ",     loan_rate:"4.350000",	loan_amount:"800000.00  "         ,interest_date:"20181127	",expire_date:"20191126",	overdue_date:"20191127",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"李翔    "    ,  job:"信用社正职           ",     loan_rate:"4.900000",	loan_amount:"800000.00  "         ,interest_date:"20130201	",expire_date:"20230201",	overdue_date:"20230202",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"罗忠勇  "    ,  job:"副行长               ",     loan_rate:"4.750000",	loan_amount:"800000.00  "         ,interest_date:"20181022	",expire_date:"20211019",	overdue_date:"20211020",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"杨昆峰  "    ,  job:"                     ",     loan_rate:"4.900000",	loan_amount:"800000.00  "         ,interest_date:"20160727	",expire_date:"20240726",	overdue_date:"20240727",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"陈晓燕  "    ,  job:"部室正职             ",     loan_rate:"6.549960",	loan_amount:"780000.00  "         ,interest_date:"20140919	",expire_date:"20240911",	overdue_date:"20240912",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"向科勇  "    ,  job:"行社一级部门正职     ",     loan_rate:"4.749960",	loan_amount:"750000.00  "         ,interest_date:"20161021	",expire_date:"20191020",	overdue_date:"20191021",debitInterest_amount:"692.08  "    ,overdue_amount:"692.08   "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"向科勇  "    ,  job:"分理处正职           ",     loan_rate:"4.749960",	loan_amount:"750000.00  "         ,interest_date:"20161021	",expire_date:"20191020",	overdue_date:"20191021",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"周应安  "    ,  job:"副主任               ",     loan_rate:"4.750000",	loan_amount:"750000.00  "         ,interest_date:"20160126	",expire_date:"20210125",	overdue_date:"20210126",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"王永刚  "    ,  job:"支行正职             ",     loan_rate:"4.749960",	loan_amount:"748000.00  "         ,interest_date:"20161019	",expire_date:"20191018",	overdue_date:"20191019",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"徐昌伟  "    ,  job:"分理处正职           ",     loan_rate:"4.750000",	loan_amount:"744000.00  "         ,interest_date:"20161208	",expire_date:"20191207",	overdue_date:"20191208",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"韦伟    "    ,  job:"网点主任             ",     loan_rate:"3.924000",	loan_amount:"740000.00  "         ,interest_date:"20160420	",expire_date:"20240419",	overdue_date:"20240420",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"罗来云  "    ,  job:"                     ",     loan_rate:"3.920000",	loan_amount:"730000.00  "         ,interest_date:"20160515	",expire_date:"20240514",	overdue_date:"20240515",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"罗来云  "    ,  job:"部室经理             ",     loan_rate:"3.920000",	loan_amount:"730000.00  "         ,interest_date:"20160515	",expire_date:"20240514",	overdue_date:"20240515",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"黄源    "    ,  job:"部室副职             ",     loan_rate:"4.350000",	loan_amount:"726500.00  "         ,interest_date:"20181009	",expire_date:"20191008",	overdue_date:"20191009",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"黄源    "    ,  job:"分社正职             ",     loan_rate:"4.350000",	loan_amount:"726500.00  "         ,interest_date:"20181009	",expire_date:"20191008",	overdue_date:"20191009",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"王强    "    ,  job:"董事长               ",     loan_rate:"4.749960",	loan_amount:"720000.00  "         ,interest_date:"20170705	",expire_date:"20200704",	overdue_date:"20200705",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"罗勇    "    ,  job:"网点主任             ",     loan_rate:"3.800000",	loan_amount:"720000.00  "         ,interest_date:"20160301	",expire_date:"20210228",	overdue_date:"20210301",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"李凤扬  "    ,  job:"部门经理             ",     loan_rate:"4.750000",	loan_amount:"710000.00  "         ,interest_date:"20180110	",expire_date:"20230109",	overdue_date:"20230110",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"梁松    "    ,  job:"副行长               ",     loan_rate:"4.749960",	loan_amount:"700000.00  "         ,interest_date:"20170120	",expire_date:"20200119",	overdue_date:"20200120",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"费志帮  "    ,  job:"部室正职             ",     loan_rate:"4.749960",	loan_amount:"700000.00  "         ,interest_date:"20181127	",expire_date:"20191126",	overdue_date:"20191127",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"冯大军  "    ,  job:"行社一级部门正职     ",     loan_rate:"4.749960",	loan_amount:"700000.00  "         ,interest_date:"20161020	",expire_date:"20191019",	overdue_date:"20191020",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"涂正露  "    ,  job:"                     ",     loan_rate:"3.920000",	loan_amount:"700000.00  "         ,interest_date:"20170607	",expire_date:"20250606",	overdue_date:"20250607",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"莫荣贵  "    ,  job:"经理                 ",     loan_rate:"4.750000",	loan_amount:"660000.00  "         ,interest_date:"20181030	",expire_date:"20211029",	overdue_date:"20211030",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"涂玉珊  "    ,  job:"分理处主任           ",     loan_rate:"4.750000",	loan_amount:"650000.00  "         ,interest_date:"20180130	",expire_date:"20210129",	overdue_date:"20210130",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"吴文清  "    ,  job:"部室正职             ",     loan_rate:"5.652000",	loan_amount:"650000.00  "         ,interest_date:"20150519	",expire_date:"20250518",	overdue_date:"20250519",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"伍义    "    ,  job:"副行长               ",     loan_rate:"5.652000",	loan_amount:"650000.00  "         ,interest_date:"20150519	",expire_date:"20250518",	overdue_date:"20250519",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"罗国辉  "    ,  job:"部室经理             ",     loan_rate:"4.900000",	loan_amount:"650000.00  "         ,interest_date:"20160803	",expire_date:"20240802",	overdue_date:"20240803",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"罗孙鹏  "    ,  job:"部室经理             ",     loan_rate:"3.920000",	loan_amount:"630000.00  "         ,interest_date:"20160518	",expire_date:"20240517",	overdue_date:"20240518",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"王炼    "    ,  job:"部室经理             ",     loan_rate:"3.920000",	loan_amount:"620000.00  "         ,interest_date:"20160927	",expire_date:"20240926",	overdue_date:"20240927",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"班积显  "    ,  job:"部室经理             ",     loan_rate:"3.920000",	loan_amount:"610000.00  "         ,interest_date:"20160516	",expire_date:"20240515",	overdue_date:"20240516",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"周里林  "    ,  job:"副主任               ",     loan_rate:"4.350000",	loan_amount:"600000.00  "         ,interest_date:"20180418	",expire_date:"20190417",	overdue_date:"20190418",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"孟秀勇  "    ,  job:"支行行长             ",     loan_rate:"4.749960",	loan_amount:"600000.00  "         ,interest_date:"20170812	",expire_date:"20200811",	overdue_date:"20200812",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"田茂高  "    ,  job:"支行行长             ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20171122	",expire_date:"20201121",	overdue_date:"20201122",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"周里林  "    ,  job:"副行长               ",     loan_rate:"4.350000",	loan_amount:"600000.00  "         ,interest_date:"20180418	",expire_date:"20190417",	overdue_date:"20190418",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"袁树清  "    ,  job:"分理处正职           ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20161212	",expire_date:"20211211",	overdue_date:"20211212",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"李旺江  "    ,  job:"行长                 ",     loan_rate:"5.895000",	loan_amount:"600000.00  "         ,interest_date:"20121214	",expire_date:"20221213",	overdue_date:"20221214",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司瓮水分理处      ",  name:"卢红    "    ,  job:"支行行长             ",     loan_rate:"4.749960",	loan_amount:"600000.00  "         ,interest_date:"20181205	",expire_date:"20211204",	overdue_date:"20211205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司银盏支行        ",  name:"宋长林  "    ,  job:"董事长               ",     loan_rate:"5.880000",	loan_amount:"600000.00  "         ,interest_date:"20181210	",expire_date:"20281209",	overdue_date:"20281210",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"邓良芝  "    ,  job:"工会主席             ",     loan_rate:"4.749960",	loan_amount:"600000.00  "         ,interest_date:"20180328	",expire_date:"20210327",	overdue_date:"20210328",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"李翔    "    ,  job:"信用社正职           ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20181120	",expire_date:"20231119",	overdue_date:"20231120",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"李翔    "    ,  job:"部室正职             ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20181120	",expire_date:"20231119",	overdue_date:"20231120",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"祝波    "    ,  job:"                     ",     loan_rate:"3.800000",	loan_amount:"600000.00  "         ,interest_date:"20160516	",expire_date:"20210515",	overdue_date:"20210516",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"张建    "    ,  job:"副主任               ",     loan_rate:"3.920000",	loan_amount:"600000.00  "         ,interest_date:"20160812	",expire_date:"20240811",	overdue_date:"20240812",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"张宇    "    ,  job:"分社主任             ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20160905	",expire_date:"20210904",	overdue_date:"20210905",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"王朝林  "    ,  job:"网点主任             ",     loan_rate:"3.920000",	loan_amount:"600000.00  "         ,interest_date:"20160517	",expire_date:"20240516",	overdue_date:"20240517",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈明俊  "    ,  job:"部门经理             ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20170818	",expire_date:"20200817",	overdue_date:"20200818",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"邹国继  "    ,  job:"                     ",     loan_rate:"3.920000",	loan_amount:"600000.00  "         ,interest_date:"20160315	",expire_date:"20240314",	overdue_date:"20240315",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"周维金  "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"600000.00  "         ,interest_date:"20181113	",expire_date:"20231112",	overdue_date:"20231113",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"张治成  "    ,  job:"                     ",     loan_rate:"3.800000",	loan_amount:"600000.00  "         ,interest_date:"20160507	",expire_date:"20210506",	overdue_date:"20210507",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"罗斌    "    ,  job:"                     ",     loan_rate:"4.750000",	loan_amount:"590000.00  "         ,interest_date:"20171115	",expire_date:"20201114",	overdue_date:"20201115",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"谭静    "    ,  job:"支行正职             ",     loan_rate:"4.749960",	loan_amount:"560000.00  "         ,interest_date:"20170307	",expire_date:"20220306",	overdue_date:"20220307",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州独山农村商业银行股份有限公司                ",  name:"胡勇    "    ,  job:"支行正职             ",     loan_rate:"4.749600",	loan_amount:"550000.00  "         ,interest_date:"20181101	",expire_date:"20211031",	overdue_date:"20211101",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"肖星锐  "    ,  job:"                     ",     loan_rate:"4.750000",	loan_amount:"550000.00  "         ,interest_date:"20160608	",expire_date:"20210607",	overdue_date:"20210608",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"石绍斌  "    ,  job:"分理处主任           ",     loan_rate:"4.350000",	loan_amount:"550000.00  "         ,interest_date:"20181203	",expire_date:"20191202",	overdue_date:"20191203",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"黄培刚  "    ,  job:"副行长               ",     loan_rate:"4.749960",	loan_amount:"550000.00  "         ,interest_date:"20161214	",expire_date:"20191213",	overdue_date:"20191214",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社城关信用社                ",  name:"宋居祥  "    ,  job:"信用社正职           ",     loan_rate:"6.370000",	loan_amount:"550000.00  "         ,interest_date:"20170718	",expire_date:"20270717",	overdue_date:"20270718",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"王强    "    ,  job:"董事长               ",     loan_rate:"4.749960",	loan_amount:"550000.00  "         ,interest_date:"20161013	",expire_date:"20191012",	overdue_date:"20191013",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"李毕伟  "    ,  job:"网点副主任           ",     loan_rate:"3.924000",	loan_amount:"550000.00  "         ,interest_date:"20160508	",expire_date:"20240507",	overdue_date:"20240508",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"易恒飞  "    ,  job:"网点主任             ",     loan_rate:"4.900000",	loan_amount:"550000.00  "         ,interest_date:"20161221	",expire_date:"20241220",	overdue_date:"20241221",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"陈长智  "    ,  job:"分理处主任           ",     loan_rate:"4.350000",	loan_amount:"540000.00  "         ,interest_date:"20181204	",expire_date:"20191203",	overdue_date:"20191204",debitInterest_amount:"410.98  "    ,overdue_amount:"410.98   "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"姜朝兰  "    ,  job:"经理                 ",     loan_rate:"4.350000",	loan_amount:"537000.00  "         ,interest_date:"20181114	",expire_date:"20191113",	overdue_date:"20191114",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"陈永超  "    ,  job:"支行行长             ",     loan_rate:"4.750000",	loan_amount:"530000.00  "         ,interest_date:"20161202	",expire_date:"20191201",	overdue_date:"20191202",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"陈永超  "    ,  job:"经理                 ",     loan_rate:"4.750000",	loan_amount:"530000.00  "         ,interest_date:"20161202	",expire_date:"20191201",	overdue_date:"20191202",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"罗勇    "    ,  job:"分理处正职           ",     loan_rate:"4.750000",	loan_amount:"530000.00  "         ,interest_date:"20161207	",expire_date:"20191206",	overdue_date:"20191207",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"刘剑    "    ,  job:"支行行长             ",     loan_rate:"4.350000",	loan_amount:"520000.00  "         ,interest_date:"20181115	",expire_date:"20191114",	overdue_date:"20191115",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"杨新禄  "    ,  job:"支行行长             ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20180930	",expire_date:"20230929",	overdue_date:"20230930",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"陈开波  "    ,  job:"副主任               ",     loan_rate:"4.410000",	loan_amount:"500000.00  "         ,interest_date:"20121011	",expire_date:"20201010",	overdue_date:"20201011",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"肖波    "    ,  job:"经理                 ",     loan_rate:"4.749960",	loan_amount:"500000.00  "         ,interest_date:"20160617	",expire_date:"20190616",	overdue_date:"20190617",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"陈开波  "    ,  job:"副行长               ",     loan_rate:"4.410000",	loan_amount:"500000.00  "         ,interest_date:"20121011	",expire_date:"20201010",	overdue_date:"20201011",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"刘平燕  "    ,  job:"董事长               ",     loan_rate:"4.749960",	loan_amount:"500000.00  "         ,interest_date:"20180419	",expire_date:"20210418",	overdue_date:"20210419",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"张慧    "    ,  job:"分理处正职           ",     loan_rate:"4.896000",	loan_amount:"500000.00  "         ,interest_date:"20141128	",expire_date:"20221127",	overdue_date:"20221128",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"田茂斌  "    ,  job:"支行行长             ",     loan_rate:"4.350000",	loan_amount:"500000.00  "         ,interest_date:"20181128	",expire_date:"20191127",	overdue_date:"20191128",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"李旺江  "    ,  job:"行长                 ",     loan_rate:"5.895000",	loan_amount:"500000.00  "         ,interest_date:"20120927	",expire_date:"20220926",	overdue_date:"20220927",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"梁松    "    ,  job:"副行长               ",     loan_rate:"5.895000",	loan_amount:"500000.00  "         ,interest_date:"20121008	",expire_date:"20221007",	overdue_date:"20221008",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"陈国洪  "    ,  job:"部室正职             ",     loan_rate:"4.752000",	loan_amount:"500000.00  "         ,interest_date:"20161215	",expire_date:"20211214",	overdue_date:"20211215",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"李旺江  "    ,  job:"行长                 ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20170524	",expire_date:"20220523",	overdue_date:"20220524",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"黄浩    "    ,  job:"支行正职             ",     loan_rate:"4.749960",	loan_amount:"500000.00  "         ,interest_date:"20170407	",expire_date:"20220406",	overdue_date:"20220407",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司                ",  name:"向松    "    ,  job:"                     ",     loan_rate:"4.749600",	loan_amount:"500000.00  "         ,interest_date:"20160223	",expire_date:"20190222",	overdue_date:"20190223",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司                ",  name:"刘怡    "    ,  job:"支行行长             ",     loan_rate:"4.749600",	loan_amount:"500000.00  "         ,interest_date:"20160726	",expire_date:"20190725",	overdue_date:"20190726",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州福泉农村商业银行股份有限公司                ",  name:"罗承宏  "    ,  job:"副行长               ",     loan_rate:"5.700000",	loan_amount:"500000.00  "         ,interest_date:"20180514	",expire_date:"20210513",	overdue_date:"20210514",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司瓮水分理处      ",  name:"石云霞  "    ,  job:"                     ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20190107	",expire_date:"20220106",	overdue_date:"20220107",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司瓮水分理处      ",  name:"蒋春林  "    ,  job:"分理处主任           ",     loan_rate:"4.749960",	loan_amount:"500000.00  "         ,interest_date:"20181213	",expire_date:"20211204",	overdue_date:"20211205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"徐昌伟  "    ,  job:"分理处正职           ",     loan_rate:"9.024960",	loan_amount:"500000.00  "         ,interest_date:"20170315	",expire_date:"20200314",	overdue_date:"20200315",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州瓮安农村商业银行股份有限公司瓮水分理处      ",  name:"蒋春林  "    ,  job:"分理处主任           ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20181206	",expire_date:"20211204",	overdue_date:"20211205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州惠水农村商业银行股份有限公司时代分理处      ",  name:"王慧    "    ,  job:"支行行长             ",     loan_rate:"4.274400",	loan_amount:"500000.00  "         ,interest_date:"20160506	",expire_date:"20210505",	overdue_date:"20210506",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州惠水农村商业银行股份有限公司时代分理处      ",  name:"班著盛  "    ,  job:"支行行长             ",     loan_rate:"4.274400",	loan_amount:"500000.00  "         ,interest_date:"20160608	",expire_date:"20210607",	overdue_date:"20210608",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"张春志  "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20190129	",expire_date:"20240128",	overdue_date:"20240129",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州惠水农村商业银行股份有限公司时代分理处      ",  name:"赵鑫    "    ,  job:"支行行长             ",     loan_rate:"4.274400",	loan_amount:"500000.00  "         ,interest_date:"20160716	",expire_date:"20210714",	overdue_date:"20210715",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州惠水农村商业银行股份有限公司南苑分理处      ",  name:"程德才  "    ,  job:"支行行长             ",     loan_rate:"4.749960",	loan_amount:"500000.00  "         ,interest_date:"20181016	",expire_date:"20231015",	overdue_date:"20231016",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"罗甸县农村信用合作联社                          ",  name:"刘志伦  "    ,  job:"网点主任             ",     loan_rate:"3.920000",	loan_amount:"500000.00  "         ,interest_date:"20170901	",expire_date:"20250831",	overdue_date:"20250901",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈慧兰  "    ,  job:"部门经理             ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20190111	",expire_date:"20240110",	overdue_date:"20240111",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈剑莹  "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20180620	",expire_date:"20230619",	overdue_date:"20230620",debitInterest_amount:"1687.78 "    ,overdue_amount:"1687.78  "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈慧兰  "    ,  job:"分社主任             ",     loan_rate:"4.750000",	loan_amount:"500000.00  "         ,interest_date:"20190111	",expire_date:"20240110",	overdue_date:"20240111",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"程德华  "    ,  job:"监事长               ",     loan_rate:"4.750000",	loan_amount:"499350.00  "         ,interest_date:"20181008	",expire_date:"20231007",	overdue_date:"20231008",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"刘元俊  "    ,  job:"经理                 ",     loan_rate:"4.749960",	loan_amount:"495000.00  "         ,interest_date:"20160920	",expire_date:"20190919",	overdue_date:"20190920",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"罗潇宇  "    ,  job:"                     ",     loan_rate:"4.900000",	loan_amount:"480000.00  "         ,interest_date:"20121102	",expire_date:"20201101",	overdue_date:"20201102",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"黎静    "    ,  job:"分理处主任           ",     loan_rate:"4.410000",	loan_amount:"480000.00  "         ,interest_date:"20130719	",expire_date:"20210718",	overdue_date:"20210719",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"部门经理             ",     loan_rate:"6.860000",	loan_amount:"480000.00  "         ,interest_date:"20180109	",expire_date:"20271204",	overdue_date:"20271205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"胡学凯  "    ,  job:"信用社主任           ",     loan_rate:"4.750000",	loan_amount:"480000.00  "         ,interest_date:"20170719	",expire_date:"20220718",	overdue_date:"20220719",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"陈晓艳  "    ,  job:"信用社主任           ",     loan_rate:"6.860000",	loan_amount:"480000.00  "         ,interest_date:"20180109	",expire_date:"20271204",	overdue_date:"20271205",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司                ",  name:"吕玉会  "    ,  job:"分理处主任           ",     loan_rate:"4.750000",	loan_amount:"470000.00  "         ,interest_date:"20180608	",expire_date:"20210607",	overdue_date:"20210608",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州荔波农村商业银行股份有限公司                ",  name:"欧慧温  "    ,  job:"风险总监             ",     loan_rate:"4.900000",	loan_amount:"460000.00  "         ,interest_date:"20170513	",expire_date:"20270510",	overdue_date:"20270511",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"罗平    "    ,  job:"分社主任             ",     loan_rate:"4.750000",	loan_amount:"460000.00  "         ,interest_date:"20160607	",expire_date:"20190606",	overdue_date:"20190607",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"罗平    "    ,  job:"部门经理             ",     loan_rate:"4.750000",	loan_amount:"460000.00  "         ,interest_date:"20160607	",expire_date:"20190606",	overdue_date:"20190607",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州独山农村商业银行股份有限公司                ",  name:"杨欣    "    ,  job:"支行正职             ",     loan_rate:"4.749600",	loan_amount:"450000.00  "         ,interest_date:"20161202	",expire_date:"20191201",	overdue_date:"20191202",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州独山农村商业银行股份有限公司中南路分理处    ",  name:"杨启培  "    ,  job:"部室正职             ",     loan_rate:"4.760400",	loan_amount:"450000.00  "         ,interest_date:"20160415	",expire_date:"20190414",	overdue_date:"20190415",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"陈英    "    ,  job:"                     ",     loan_rate:"4.750000",	loan_amount:"450000.00  "         ,interest_date:"20170401	",expire_date:"20220329",	overdue_date:"20220330",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州都匀农村商业银行股份有限公司                ",  name:"王丽敏  "    ,  job:"                     ",     loan_rate:"5.700000",	loan_amount:"450000.00  "         ,interest_date:"20181017	",expire_date:"20231010",	overdue_date:"20231011",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"马忠义  "    ,  job:"支行正职             ",     loan_rate:"4.750000",	loan_amount:"450000.00  "         ,interest_date:"20180330	",expire_date:"20200329",	overdue_date:"20200330",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"吴红顺  "    ,  job:"分理处正职           ",     loan_rate:"4.350000",	loan_amount:"450000.00  "         ,interest_date:"20180330	",expire_date:"20190329",	overdue_date:"20190330",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州三都农村商业银行股份有限公司                ",  name:"李建澄  "    ,  job:"支行正职             ",     loan_rate:"6.150000",	loan_amount:"450000.00  "         ,interest_date:"20150115	",expire_date:"20250114",	overdue_date:"20250115",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"李涛    "    ,  job:"支行副职             ",     loan_rate:"4.750000",	loan_amount:"450000.00  "         ,interest_date:"20170227	",expire_date:"20200226",	overdue_date:"20200227",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州平塘农村商业银行股份有限公司金盆分理处      ",  name:"莫荣贵  "    ,  job:"经理                 ",     loan_rate:"6.271920",	loan_amount:"440000.00  "         ,interest_date:"20161104	",expire_date:"20261007",	overdue_date:"20261008",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"刘锦鸿  "    ,  job:"部室正职             ",     loan_rate:"4.750000",	loan_amount:"440000.00  "         ,interest_date:"20170510	",expire_date:"20220509",	overdue_date:"20220510",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"庭婷    "    ,  job:"部室正职             ",     loan_rate:"4.750000",	loan_amount:"440000.00  "         ,interest_date:"20181023	",expire_date:"20231022",	overdue_date:"20231023",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"刘锦鸿  "    ,  job:"支行正职             ",     loan_rate:"4.750000",	loan_amount:"440000.00  "         ,interest_date:"20170510	",expire_date:"20220509",	overdue_date:"20220510",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵定县农村信用合作联社                          ",  name:"石坚    "    ,  job:"信用社正职           ",     loan_rate:"5.390000",	loan_amount:"435000.00  "         ,interest_date:"20130513	",expire_date:"20230510",	overdue_date:"20230511",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"长顺县农村信用合作联社                          ",  name:"程德华  "    ,  job:"监事长               ",     loan_rate:"4.750000",	loan_amount:"433175.00  "         ,interest_date:"20181008	",expire_date:"20231007",	overdue_date:"20231008",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州独山农村商业银行股份有限公司                ",  name:"杨治珍  "    ,  job:"部室正职             ",     loan_rate:"4.749600",	loan_amount:"430000.00  "         ,interest_date:"20161026	",expire_date:"20191025",	overdue_date:"20191026",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州龙里农村商业银行股份有限公司                ",  name:"曾永红  "    ,  job:"支行正职             ",     loan_rate:"4.750000",	loan_amount:"430000.00  "         ,interest_date:"20170816	",expire_date:"20200815",	overdue_date:"20200816",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   },
{org_name:"贵州惠水农村商业银行股份有限公司时代分理处      ",  name:"王永刚  "    ,  job:"经理                 ",     loan_rate:"4.274400",	loan_amount:"430000.00  "         ,interest_date:"20160204	",expire_date:"20210203",	overdue_date:"20210204",debitInterest_amount:"0.00    "    ,overdue_amount:"0.00     "   } 
     
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
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
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>