<template>
  <div id="myeditor"></div>
</template>

<script setup>
import E from "wangeditor";
import { onMounted, defineEmits, defineProps } from "vue";
const emit = defineEmits(["event"]);
const props = defineProps({
  content: String
})
onMounted(() => {
  const editor = new E("#myeditor");
  editor.create();
  // 设置初始值
  props.content && editor.txt.html(props.content)
  // onchange回调函数，获取键盘输入内容，传给父组件
  editor.config.onchange = function (newHtml) {
    // 子传父
    emit("event", newHtml)

  };
  // 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 500; // 修改为 500ms
  
});
</script>

<style>
</style>