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
    <div class="flex mt-[20px]">
      <el-button class="flex-1" @click="emit('cancel')"> 取消</el-button>
      <el-button class="flex-1" type="primary" @click="onSaveClick">
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { updateMap } from '@/api/map.js';

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  description: { type: String, default: '' }
});
const emit = defineEmits(['updated', 'cancel']);

const form = reactive({ name: props.name, description: props.description });

function onSaveClick() {
  if (!form.name) {
    ElMessage.warning({ message: '请输入地图名称' });
    return;
  }
  const data = { ...form, mapId: props.id };
  updateMap(data).then(() => {
    ElMessage.success({ message: '更新成功' });
    emit('updated');
    form.name = '';
    form.description = '';
  });
}
</script>

<style scoped></style>
