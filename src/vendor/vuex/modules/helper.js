// state
const state = {
    //
    monitoringData: {},
    isChange: 0
}
// getters
const getters = {
    getMonitoringData: state => state.monitoringData,
    getDataListener: state => state.isChange
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
        state.isChange++;
        Object.assign(state.monitoringData, data);
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}