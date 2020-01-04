export const state={
    history:[],
    // 机票价格
    totalprice:''
}
// export const state = () => ({
//     // 历史搜索记录
//     history: []
// })
export const mutations = {
    historydata(state,data){
     state.history.unshift(data)
    },
    // 机票价格
    allprice(state,price){
        state.totalprice=price
    }
}

// export const mutations = {
//     historydata(state, data){
//         state.history.unshift(data)
//     }
// }