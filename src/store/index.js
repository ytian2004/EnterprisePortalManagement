import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouter:false,
    isCollapsed:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter = value;
    },
    // 控制侧边栏展示
    changeCollapsed(state){
      state.isCollapsed = !state.isCollapsed;
    },
    changeUserInfo(state,value){
      state.userInfo = {
       ...state.userInfo, // 展开老的
       ...value // 合并新的
      }
    },
    clearUserInfo(state){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isCollapsed","userInfo"] // 控制是否持久化
  })],
})
