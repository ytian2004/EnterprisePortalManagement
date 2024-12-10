<template>
  <div>
    <el-page-header :icon="null" content="添加产品" title="产品管理" />
    <el-form
      ref="productFormRef"
      style="max-width: 600px"
      :model="productForm"
      :rules="productFormRules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input type="textarea" v-model="productForm.introduction" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input type="textarea" v-model="productForm.detail" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @change="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button class="addProduct" type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";
import {upload} from "@/util/upload"
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()  // 拿到整个路由对象
const productFormRef = ref();

const productForm = reactive({
  title: "", // 产品名称
  introduction: "", // 简要描述
  detail:"", // 详细描述
  cover:"", // 产品图片
  file: null
})

const productFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简要描述", trigger: "blur" }],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
})

// 每次图片选择完后，要回调
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  //   // 提交给后端用的
  productForm.file = file;
};

const submitForm = ()=>{
  productFormRef.value.validate(async (valid)=>{
    if(valid){
      await upload("/adminapi/product/add",productForm)
      console.log(productForm)
      router.push(`/product-manage/productlist`)
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form{
  margin-top: 50px;
  .addProduct{
    margin-top: 30px;
    margin-left: 110px;
  }
}
</style>