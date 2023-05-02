export function SelectTabBar(state, index) {
    if (index < 0) {
        state.CurTabbarIndex = state.PreTabbarIndex;
        state.PreTabbarIndex = 0;
    } else {
        state.PreTabbarIndex = state.CurTabbarIndex;
        state.CurTabbarIndex = index;
    }
}

export function setDatabase(state,db){
    state.database = db;
}
export function setRefreshListState(state,isRefresh){
    state.RefreshListState = isRefresh;
}

//本地存储
export function setLocalItem(state,keyval){
    localStorage.setItem(keyval.key,keyval.val);
}