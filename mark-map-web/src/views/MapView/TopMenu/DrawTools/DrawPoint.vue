<template>
  <el-dropdown>
    <div
      class="border border-gray-400 bg-white py-[7px] px-[13px] cursor-pointer"
    >
      <el-icon><add-location /></el-icon>
      点标注
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onPointLocateClick">
          <el-icon><location-information /></el-icon>
          <span class="ml-1">点击定位</span>
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <el-icon><position /></el-icon>
          <span class="ml-1">坐标定位</span>
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <el-icon><document-add /></el-icon>
          <span class="ml-1">批量导入</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPointStore } from '@/store/editingFeature.js';
import {
  AddLocation,
  DocumentAdd,
  LocationInformation,
  Position
} from '@element-plus/icons-vue';

const store = useEditingPointStore();

function onPointLocateClick() {
  const map = getMap();
  map.mm.enablePop = false;
  map.setCursor('crosshair');
  map.once('click', e => {
    map.mm.addPointConfirm({
      coordinate: e.coordinate
    });
    map.mm.enablePop = true;
    map.setCursor('default');
  });
}
</script>

<style scoped></style>
