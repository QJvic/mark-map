<template>
  <el-card
    body-style="padding:0;"
    shadow="hover"
    class="inline-block h-[360px] w-[320px] m-6"
    v-if="!editing"
  >
    <div
      class="h-[240px] group"
      :style="`background: url(${mapBG});background-size:cover`"
    >
      <div
        class="hidden h-full w-full bg-black bg-opacity-10 items-center justify-center group-hover:flex"
      >
        <div
          class="bg-sky-500 cursor-pointer px-[60px] py-[10px] rounded-lg text-white"
          @click="onEnterClick"
        >
          进入地图
        </div>
      </div>
    </div>
    <div class="w-full h-[42px] flex justify-center items-center text-xl">
      {{ data.name }}
    </div>
    <div class="w-full h-[20px] mb-[5px] flex justify-center items-center">
      <span class="text-sm text-slate-500">更新时间：</span>
      <span class="text-sm text-slate-500">
        {{ formatTime(data.updatedAt) }}
      </span>
    </div>
    <div class="h-[52px] bg-gray-100 flex items-center justify-end px-[10px]">
      <el-button plain @click="onRemoveClick">删除</el-button>
      <el-button plain @click="onEditClick">编辑</el-button>
      <el-button plain v-if="false">分享</el-button>
    </div>
  </el-card>
  <map-card-edit
    v-else
    :id="data.id"
    :name="data.name"
    :description="data.description"
    @updated="
      () => {
        emit('updated');
        editing = false;
      }
    "
    @cancel="editing = false"
  ></map-card-edit>
</template>

<script setup>
import { dayjs, ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { delMap } from '@/api/map.js';
import mapBG from './map.png';
import { ref } from 'vue';
import MapCardEdit from './MapCardEdit.vue';

const props = defineProps({
  data: {
    type: Object
  }
});
const emit = defineEmits(['updated']);
const router = useRouter();

function formatTime(val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
}

async function onRemoveClick() {
  ElMessageBox.confirm('是否确认删除？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await delMap(props.data.id);
    ElMessage.success({ message: '删除成功' });
    emit('updated');
  });
}

function onEnterClick() {
  router.push('/map?id=' + props.data.id);
}

const editing = ref(false);
function onEditClick() {
  editing.value = true;
}
</script>

<style scoped></style>
