<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollpsed"><Menu /></el-icon>
      <span style="margin-left:10px">企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span>欢迎 {{store.state.userInfo.username}} 回来！</span>
      <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon :size=30><User /></el-icon>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useStore } from 'vuex'
import { Menu, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const handleCollpsed = () => {
    store.commit('changeCollapsed');
}

// 跳转到个人中心
const handleCenter = ()=>{
  router.push('/center')
}

// 退出登录
const handleLogout = ()=>{
  router.push('/login')
  store.commit('clearUserInfo',{})
  localStorage.removeItem('token')
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.left, .right{
  display: flex;
}
.left{
  i {
    margin: auto;
  }
}
.right{
  .el-dropdown{
    margin: auto;
  }
}
</style>