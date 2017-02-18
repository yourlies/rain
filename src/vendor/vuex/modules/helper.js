// state
const state = {
    //
    monitoringData: []
}
// getters
const getters = {
    getMonitoringData: state => state.monitoringData,
}
// actions
const actions = {
    reportData ({ commit }, data) {
        commit('REPORT_DATA', data);
    },
}
// mutations
const mutations = {
    // 触发钩子事件
    REPORT_DATA (state, data) {
        state.monitoringData.push(data);
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}