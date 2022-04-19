<template>
  <div
    v-show="store.moving"
    class="absolute p-[20px] bottom-[20px] right-[20px] rounded-[5px] z-10 bg-white drop-shadow-2xl"
  >
    <div class="mb-[10px]">
      <el-button @click="onCancelClick">取消修改</el-button>
    </div>
    <div>
      <el-button type="primary" @click="onSaveClick">保存修改</el-button>
    </div>
  </div>
</template>

<script setup>
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolygonStore } from '@/store/editingFeature.js';

const store = useEditingPolygonStore();

function onCancelClick() {
  const map = getMap();
  map.mm.movePolygonCancel();
}

function onSaveClick() {
  const map = getMap();
  map.mm.movePolygonEnd();
}
</script>

<style scoped></style>
