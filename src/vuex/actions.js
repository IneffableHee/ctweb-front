//test
export const setToken = ({commit},token) => {
    commit('INCREMENT',token)
}
export const deleteToken = ({commit}) => {
    commit('DECREMENT')
}

export const setBanks = ({commit},banks) => {
    commit('INCREMENTBANKS',banks)
}
export const deleteBanks = ({commit}) => {
    commit('DECREMENT')
}

export const setTimes = ({commit},times) => {
    commit('INCREMENTTIMES',times)
}
export const deleteTimes = ({commit}) => {
    commit('DECREMENT')
}

export const setBank = ({commit},bank) => {
    commit('INCREMENTBANK',bank)
}
export const deleteBank = ({commit}) => {
    commit('DECREMENT')
}

export const setTime = ({commit},time) => {
    commit('INCREMENTTIME',time)
}
export const deleteTime = ({commit}) => {
    commit('DECREMENT')
}