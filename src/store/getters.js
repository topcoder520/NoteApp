export function IsShowTabBar(state) {
    return !(state.CurTabbarIndex == 1)
}

export function getLocalItem(){
    return (key)=>{
        return localStorage.getItem(key)
    }
}