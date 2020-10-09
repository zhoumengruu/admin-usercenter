const login = {
    namespaced:true,
    state:{
        userinfo:{}
    },
    mutations:{
        addUserInfo(state,data){
            state.userinfo = data 
        }
    },
    
    }
    export default login