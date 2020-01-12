export const state={
    draft:[],  
    
}
export const mutations = {
   draftdata(state,data){
     state.draft.unshift(data)
    },
   
}