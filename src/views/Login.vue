<template>
  <div>
    <Particles
      id="tsparticles"
      :options="options"
    />

    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            type="username"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

const router = useRouter();
// 表单绑定的响应式对象
const loginForm = reactive({
  username: "",
  password: "",
});

// 表单的引用对象
const loginFormRef = ref();

const loginRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

// 提交表单函数
const submitForm = () => {
  // 1. 校验表单
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 1.这样只要输入用户名和密码就能登录进去，太不安全，需要后端校验
      // console.log("校验成功");
      // localStorage.setItem("token", "123456");
      // router.push("/index");

      // 2. 提交后台，校验用户名和密码，如果成功，设置token，跳转到首页，如果失败，提示用户名和密码不匹配
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        // console.log(res.data);
        if (res.data.ActionType === "OK") {
          store.commit("changeUserInfo", res.data.data);
          store.commit("changeGetterRouter", false);
          router.push("/index");
        } else {
          ElMessage.error("用户名和密码不匹配");
        }
      });
    } else {
      console.log("校验失败");
      return false;
    }
  });
  // 2. 拿到表单内容，提交后台
  // 3. 设置token
  // localStorage.setItem("token", "123456");
};

const options = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(#d3d3d3, 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  .loginform {
    margin-top: 20px;
  }

  h3 {
    font-size: 30px;
  }
}
:deep(.el-form-item__label) {
  color: white;
}
</style>