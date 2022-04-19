<template>
  <el-card
    body-style="padding:20px 10%;width:100%;"
    shadow="hover"
    class="inline-block h-[360px] w-[320px] m-6 group hover:bg-gray-100"
  >
    <p class="my-[10px] text-gray-400 group-hover:text-black">地图名称</p>
    <el-input
      placeholder="请输入地图名称（必填）"
      v-model="form.name"
    ></el-input>
    <p class="mt-[20px] text-gray-400 group-hover:text-black">地图描述</p>
    <el-input
      placeholder="请输入地图名称（选填）"
      type="textarea"
      :rows="6"
      resize="none"
      v-model="form.description"
    ></el-input>
    <el-button
      :disabled="disabled"
      class="mt-[20px] w-full"
      type="primary"
      @click="onAddClick"
    >
      新建
    </el-button>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { addMap } from '@/api/map.js';

const emit = defineEmits(['added']);

const form = reactive({ name: '', description: '' });
const disabled = ref(false);

function onAddClick() {
  if (!form.name) {
    ElMessage.warning({ message: '请输入地图名称' });
    return;
  }
  addMap(form).then(() => {
    ElMessage.success({ message: '创建成功' });
    emit('added');
    form.name = '';
    form.description = '';
    disabled.value = true;
    setTimeout(() => (disabled.value = false), 1000);
  });
}
</script>

<style scoped></style>
