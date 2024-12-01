<template>
  <div>
    <el-card>
      <el-page-header :icon="null" content="产品列表" title="产品管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180" />
        <el-table-column prop="introduction" label="简要描述" width="180"/>
        <el-table-column prop="editTime" label="更新时间" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              circle
              :icon="Edit"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-popconfirm
              title="你确定要删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  circle
                  :icon="Delete"
                  type="danger"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="font-size: 12px; color: gray">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewData.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const productFormRef = ref();
const productForm = reactive({
  title: "", // 产品名称
  introduction: "", // 简要描述
  detail: "", // 详细描述
  cover: "", // 产品图片
  file: null,
});

// 存放Table数据
const tableData = ref([]);

const productFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简要描述", trigger: "blur" },],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
});

// 页面加载时调用getTableData获取数据
onMounted(() => {
  getTableData();
});

// 获取Table数据
const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  // console.log(res.data)
  tableData.value = res.data.data;
};

// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/product/list/${item._id}`);
  await getTableData();
};

// 编辑回调
const handleEdit = (item) => {
  router.push(`/news-manage/editproduct/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>