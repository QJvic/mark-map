<template>
  <el-dropdown>
    <div
      class="ml-[-1px] border border-gray-400 bg-white py-[7px] px-[13px] cursor-pointer"
    >
      <i class="iconfont icon-poly-line"></i>
      线标注
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onLineClick">
          <i class="iconfont icon-poly-line"></i>
          <span class="ml-1">折线</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { getMap } from '@/components/VMap/mapInstance.js';
import * as maptalks from 'maptalks';

function onLineClick() {
  const map = getMap();
  map.mm.enablePop = false;
  map.setCursor('crosshair');
  const drawTool = new maptalks.DrawTool({
    mode: 'LineString',
    symbol: {
      lineColor: '#fc2a2a'
    }
  });
  drawTool.on('drawend', e => {
    map.mm.enablePop = true;
    drawTool.remove();
    map.setCursor('default');
    map.mm.addPolylineConfirm({ coordinate: e.geometry.getCoordinates() });
  });
  drawTool.addTo(map);
}
</script>

<style scoped></style>
