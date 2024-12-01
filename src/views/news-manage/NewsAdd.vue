<template>
  <div>
    <el-page-header :icon="null" content="创建新闻" title="新闻管理" />
    <el-form
      ref="newsFormRef"
      style="max-width: 600px"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor @event="handleEvent"/>
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select
          v-model="newsForm.category"
          placeholder="请选择分类"
          style="width: 100%"
        >
          <el-option
            v-for="item in optionsCategories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <Upload :avatar="newsForm.cover" @change="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import editor from '@/components/editor/Editor.vue'
import Upload from "@/components/upload/Upload.vue";
import {upload} from "@/util/upload"
import { useRouter } from 'vue-router'
import axios from 'axios'


const router = useRouter()


const newsFormRef = ref();

const newsForm = reactive({
  title: "",
  content: "",
  category: 1, // 1.最新动态，2.典型案例，3.通知公告
  cover: "",
  file: null,
  isPublish: 0 // 0.未发布，1.已发布(后期使用)

})

const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category:[{required:true,message:"请选择分类",trigger:"blur"}],
  cover:[{required: true, message:"请上传图片",trigger: "blur"}],
  file: [{required: true, message:"请上传文件",trigger: "blur"}],
  ifPublish:[{required:true,message:"请选择是否发布",trigger:"blur"}]
})

// 新闻类别
const optionsCategories = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  }
]

// 每次editor改变的回调
const handleEvent = (data)=>{
  // console.log(data)
  newsForm.content = data
}

const handleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = file
}

const submitForm = () => {
  newsFormRef.value.validate(async (valid)=>{
    if(valid){
      const res = await axios.post('/adminapi/news/add', newsForm)
      router.push(`/news-manage/newslist`)
    }
  })
}

</script>

<style lang="scss" scoped>
.el-form{
  margin-top: 50px;
}
</style>