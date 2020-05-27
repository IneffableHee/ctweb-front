import axios from './http';
import qs from "qs";

let base = 'http://192.168.0.5:8801/financialct';

export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params)).then(res => res.data); };

export const getBankList = params => { return axios.get(`${base}/home/getBanks`, { params: params }); };

export const getTimeList = params => { return axios.get(`${base}/home/getTimes`, { params: params }); };
//  全局概览获取后台json数据
export const getEchartsQjgl = params => { return axios.get(`${base}/home/getQXGL`, { params: params }); };

export const getQjglCunKuan = params => { return axios.get(`${base}/home/qxgl/cunkuan`, { params: params }); };

export const getQjglDaiKuan = params => { return axios.get(`${base}/home/qxgl/daikuan`, { params: params }); };

export const getQjglZiChan = params => { return axios.get(`${base}/home/qxgl/zichan`, { params: params }); };

export const getQjglFuZhai = params => { return axios.get(`${base}/home/qxgl/fuzhai`, { params: params }); };

//  
export const getZiChanJieGou = params => { return axios.get(`${base}/home/zcjg`, { params: params }); };

// 贷款损失准备充足率（季报）
export const getDaiKuanSunShiZuiBei = params => { return axios.get(`${base}/home/dksszb`, { params: params }); };
//拨备覆盖率
export const getBobeiFuGaiLv = params => { return axios.get(`${base}/home/bbfgl`, { params: params }); };  
//农合机构资产利润率  数据库没有数据
// export const getZiChanLiRunLv = params => { return axios.get(`${base}/home/nongHe/zclrl`, { params: params }); };  

// 后置条件 资产结构的后置条件 逾期90天的-本期新增不良贷款占新发放贷款的比例-显示正常类（正常 + 关注）降级为不良贷款的迁徙率-显示处置不良贷款占新形成不良贷款的比例
// 逾期90天的
export const getYuQi90Tian = params => { return axios.get(`${base}/home/yq90t`, { params: params }); };
// 资产结构的后置条件-本期新增不良贷款占新发放贷款的比例-显示正常类（正常 + 关注）降级为不良贷款的迁徙率-显示处置不良贷款占新形成不良贷款的比例
export const getBuLiangDaiKuanHZTJ = params => { return axios.get(`${base}/home/buLiangDaiKuanHZTJ`, { params: params }); };

// 表外业务
export const getBiaoWaiYeWu = params => { return axios.get(`${base}/home/biaoWaiYeWu`, { params: params }); };
export const getBWYWHZTJ = params => { return axios.get(`${base}/home/bwyw/hztj`, { params: params }); };

// 不良清收
export const getBuLiangQingShou = params => { return axios.get(`${base}/home/buLiangQingShou`, { params: params }); };
export const getBLQShztj = params => { return axios.get(`${base}/home/blqs/hztj`, { params: params }); };

export const getNHLiRunShouRu = params => { return axios.get(`${base}/home/liRunShouRu`, { params: params }); };

export const getGeneralFunctions = params => { return axios.get(`${base}/home/generalFunctions`, { params: params }); };

export const generalFunctionsByCode = params => { return axios.get(`${base}/home/generalFunctionsByCode`, { params: params }); };

//集中度
export const tableByName = params => { return axios.get(`${base}/home/tableByName`, { params: params }); };

export const generalFunctionsByParentCode = params => { return axios.get(`${base}/home/generalFunctionsByParentCode`, { params: params }); };




