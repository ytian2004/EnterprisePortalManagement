<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import {defineEmits,defineProps, computed} from "vue"
import { Plus } from "@element-plus/icons-vue";

// 父传子，利用defineProps接收属性
const props = defineProps({
  avatar:String

})

const uploadAvatar = computed(()=>{
  return props.avatar.includes("blob")?props.avatar:('http://localhost:3000' + props.avatar)
})


// 子传父，利用defineEmits定义emit对象，利用emit对象把数据传给父组件（父组件接收到后，进行更改，更改完后，又传给子组件）
const emit = defineEmits(['change'])

// 每次选择完图片之后的回调
const handleChange = file => {
    // 发射事件，把选择的图片传给父组件
    // console.log(props.avatar)
    emit("change", file.raw)
}
</script>

<style lang="scss" scoped>
 .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep( .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep( .el-upload:hover) {
  border-color: var(--el-color-primary);
}
:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>