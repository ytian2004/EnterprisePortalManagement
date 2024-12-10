<template>
  <div>
    <el-card>
      <el-page-header :icon="null" content="新闻列表" title="新闻管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="category" label="分类" width="180">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="更新时间" width="180">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="是否发布" width="180">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitchChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              circle
              :icon="Star"
              type="success"
              @click="handlePreview(scope.row)"
            ></el-button>
            <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
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
import { Star, Edit, Delete, StarFilled, CloseBold } from "@element-plus/icons-vue";
import {useRouter} from "vue-router"

const router = useRouter()

const newsForm = reactive({
  title: "",
  content: "",
  category: 1, // 1.最新动态，2.典型案例，3.通知公告
  cover: "",
  file: null,
  isPublish: 0, // 0.未发布，1.已发布(后期使用)
  id:""
});

const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur" }],
  ifPublish: [{ required: true, message: "请选择是否发布", trigger: "blur" }],
});
// 存放Table数据
const tableData = ref([]);
const previewData = ref({});
const dialogFormVisible = ref(false);

// 页面加载时调用getTableData获取数据
onMounted(() => {
  getTableData();

});

// 获取Table数据
const getTableData = async () => {
  const res = await axios.get("/adminapi/news/list");
  tableData.value = res.data.data;
};

// 格式化分类信息
const categoryFormat = (category) => {
  if (category === 1) {
    return "最新动态";
  } else if (category === 2) {
    return "典型案例";
  } else {
    return "通知公告";
  }
};

// 开关回调
const handleSwitchChange = async (item) => {
  await axios.put("/adminapi/news/publish", {
    _id: item._id,
    isPublish: item.isPublish,
  });
  getTableData();
};

// 预览回调
const handlePreview = (item) => {
  previewData.value = item;
  dialogFormVisible.value = true;
};

// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item._id}`);
  getTableData();
};

// 编辑回调
const handleEdit = (item) => {
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>