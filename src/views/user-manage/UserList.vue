<template>
  <div>
    <el-card>
      <el-page-header :icon="null" content="用户列表" title="用户管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="avatar" label="头像" width="180">
          <!-- 下述内容为一个作用域插槽， #default 为 v-slot:default 的缩写 -->
          <template #default="scope"> 
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 2" type="success">编辑</el-tag>
            <el-tag v-else type="danger">管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              title="你确定要删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="编辑用户" width="50%">
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
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
          />
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";

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

// 弹出框
const dialogFormVisible = ref(false);
const userFormRef = ref();
let userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1是管理员，2是编辑
  introduction: "",
});

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
});

// 存放Table数据
const tableData = ref([]);

// 页面加载时调用getTableData获取数据
onMounted(() => {
  getTableData();
});

// 获取Table数据
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  // console.log(res.data)
  tableData.value = res.data.data;
};

// 编辑回调
const handleEdit = async (data) => {
  // 从服务端获取表单数据，并赋值给表单数据对象
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  userForm.value = res.data.data[0]
  // 将表单数据合并到表单数据对象中
  Object.assign(userForm, res.data.data[0])
  dialogFormVisible.value = true;
};

// 编辑确认回调
const handleEditConfirm =()=>{
  userFormRef.value.validate(async (valid)=>{
    if(valid){
      // 1.更新后端
      await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)

      // 2.dialog隐藏
    dialogFormVisible.value = false;

      // 3.获取table数据
      getTableData();
    }
  })

}

const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`);
  // 删除完成后，可以重新加载页面或者数据，来更新最新页面信息
  // reload page
  // relaod data
  getTableData();
  // tableData
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>