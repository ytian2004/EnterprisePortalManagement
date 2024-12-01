<template>
  <div>
    <el-page-header :icon="null" content="添加用户" title="用户管理" />
    <el-form
      ref="userFormRef"
      style="max-width: 600px"
      :model="userForm"
      :rules="userFormRules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select
          v-model="userForm.gender"
          placeholder="请选择性别"
          style="width: 100%"
        >
          <el-option
            v-for="item in optionsGenders"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          v-model="userForm.role"
          placeholder="请选择角色"
          style="width: 100%"
        >
          <el-option
            v-for="item in optionsRoles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input type="textarea" v-model="userForm.introduction" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @change="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload.vue";
import {upload} from "@/util/upload"
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userFormRef = ref();

const router = useRouter()

const userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1是管理员，2是编辑
  introduction: "",
  avatar: "",
  file: null,
  gender: 0
});

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

const optionsGenders = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

const optionsRoles = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  //   // 提交给后端用的
  userForm.file = file;
};

const submitForm = () => {
  userFormRef.value.validate(async (valid)=>{
    if(valid){
      // 提交数据到后端
      const res = await upload('/adminapi/user/add',userForm)
      // console.log(res.data)
      router.push("/user-manage/userlist")
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>