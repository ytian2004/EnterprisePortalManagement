<template>
  <div>
    <el-page-header :icon="null" content="首页" title="企业门户管理系统" />
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">欢迎 {{store.state.userInfo.username}} 回来，{{newText}}</h3>
        </el-col>
        
      </el-row>
    </el-card>
    <el-card class="box-card" title="公司产品">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
          <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in loopList" :key="item._id">
              <div :style="{backgroundImage:`url(http://localhost:3000${item.cover})`,backgroundSize:'cover'}">
                <h3>{{ item.title }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
const route = useRoute()
const store = useStore();
const loopList = ref([])

// 计算属性
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000'+store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const newText = computed(() => new Date().getHours()>12? '你可能有点累了，喝杯咖啡提提神吧！':'上午好，元气满满的一天！')

onMounted(async ()=>{
    const res = await axios.get("/adminapi/product/list")

    loopList.value = res.data.data

    console.log(loopList.value)


})

// console.log(store.state.userInfo);
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>