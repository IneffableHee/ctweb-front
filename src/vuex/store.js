import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
	token: sessionStorage.getItem('token'),
	banks: sessionStorage.getItem('banks'),
	times: sessionStorage.getItem('times'),
	bank: sessionStorage.getItem('bank'),
	time: sessionStorage.getItem('time'),
}

// 定义所需的 mutations
const mutations = {
	INCREMENT(state, token) {
		state.token = token;
	},
	INCREMENTBANKS(state, banks) {
		state.banks = banks;
		sessionStorage.setItem('banks', banks);
	},
	INCREMENTTIMES(state, times) {
		sessionStorage.setItem('times', times);
		state.times = times;
	},
	INCREMENTBANK(state, bank) {
		sessionStorage.setItem('bank', bank);
		state.bank = bank;
	},
	INCREMENTTIME(state, time) {
		sessionStorage.setItem('time', time);
		state.time = time;
	},
	DECREMENT(state) {
		state.token = "";
		state.banks = "";
		state.times = "";
		state.bank = "";
		state.time = "";
	}
}

// 创建 store 实例
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})
