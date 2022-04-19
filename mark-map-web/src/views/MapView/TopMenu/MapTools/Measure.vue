<template>
  <el-dropdown>
    <div
      class="ml-[10px] border border-gray-400 bg-white py-[7px] px-[13px] cursor-pointer"
    >
      <el-icon><briefcase /></el-icon>
      工具
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onMeasureDistanceClick">
          <i class="iconfont icon-distance"></i>
          <span class="ml-1">距离测量</span>
        </el-dropdown-item>
        <el-dropdown-item @click="onMeasureAreaClick">
          <i class="iconfont icon-area2"></i>
          <span class="ml-1">面积测量</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { getMap } from '@/components/VMap/mapInstance.js';
import { Briefcase } from '@element-plus/icons-vue';

function onMeasureDistanceClick() {
  const map = getMap();
  map.mm.distanceTool.enable();
}

function onMeasureAreaClick() {
  const map = getMap();
  map.mm.areaTool.enable();
}
</script>

<style scoped></style>
