import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue' //@是src的别名
import RoutesConfig from './config'
import store from '../store/index.js'

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path: "/mainBox",
    name: "mainBox",
    component: MainBox,
  }
  // mainBox动态路由后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  base:process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next)=>{ // to：要去的路由对象，from：来自的路由对象，next：放行函数 
  if(to.path === '/login'){
    next();
  }else{
    if(!localStorage.getItem('token')){
      next('/login')
    }else{
      if(!store.state.isGetterRouter){
        // 首先删除所有的嵌套路由
        router.removeRoute("mainBox")
        configRouter(); // 动态添加路由
        next({
          path: to.fullPath
        })
      }else{
        next();
      }
    }
  }
  
})

const configRouter = () => {
  if(!router.hasRoute("mainBox")){
    router.addRoute({
      path: "/mainBox",
      name: "mainBox",
      component: MainBox
    })
  }
  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute('mainBox', item);
  })
  // 改变isGetterRouter为true
  store.commit('changeGetterRouter', true);
}

// 判断是否为管理员，如果是，则返回true，允许添加用户管理路由
const checkPermission = (item) => {
  if(item.requireAdmin){
    return store.state.userInfo.role === 1;
  }
  return true;
}

export default router
