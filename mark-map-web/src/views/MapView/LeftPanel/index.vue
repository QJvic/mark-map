<template>
  <div class="absolute left-[20px] top-[20px] w-[350px] z-10 bg-white">
    <div
      class="absolute right-[10px] top-[10px] z-20 cursor-pointer text-gray-400"
    >
      <el-icon @click="fold = !fold">
        <arrow-up-bold v-show="!fold" />
        <arrow-down-bold v-show="fold" />
      </el-icon>
    </div>
    <el-tabs
      v-model="active"
      type="border-card"
      :class="[fold ? 'h-[40px] ' : 'h-[550px]', 'tabs']"
    >
      <el-tab-pane label="点标注" name="point" lazy>
        <point-panel></point-panel>
      </el-tab-pane>
      <el-tab-pane label="线标注" name="polyline" lazy>
        <polyline-panel></polyline-panel>
      </el-tab-pane>
      <el-tab-pane label="面标注" name="polygon" lazy>
        <polygon-panel></polygon-panel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import PolygonPanel from '@/views/MapView/LeftPanel/PolygonPanel.vue';
import PolylinePanel from '@/views/MapView/LeftPanel/PolylinePanel.vue';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ref } from 'vue';
import PointPanel from '@/views/MapView/LeftPanel/PointPanel.vue';

const fold = ref(false);
const active = ref('point');
</script>

<style scoped lang="less">
.tabs {
  :deep(.el-tabs__content) {
    position: relative;
    padding: 0;
    height: calc(100% - 40px);
    overflow: auto;
  }

  :deep(.el-tab-pane) {
    height: 100%;
  }
}
</style>
