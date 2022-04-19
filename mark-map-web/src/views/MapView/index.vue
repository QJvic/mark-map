<template>
  <div class="w-screen h-screen flex flex-col">
    <div
      class="absolute right-0 cursor-pointer text-xs bg-gray-200 p-[4px] z-20"
      @click="full = !full"
    >
      {{ full ? '取消全屏' : '全屏' }}
    </div>

    <!--    页面头部    -->
    <transition
      leave-active-class="animate-[ht0_0.3s_ease-in-out] overflow-hidden"
      enter-active-class="animate-[hf0_0.3s_ease-in-out] overflow-hidden"
    >
      <header-view v-show="!full"></header-view>
    </transition>

    <div class="flex-1 relative overflow-hidden">
      <!--      顶部按钮    -->
      <transition
        enter-active-class="translate-x-[120%] duration-300"
        enter-to-class="translate-x-[0%]"
        leave-active-class="translate-x-[120%] duration-300"
      >
        <top-menu v-show="!full"></top-menu>
      </transition>

      <!--      地图页面左侧列表栏    -->
      <transition
        enter-active-class="translate-x-[-120%] duration-300"
        enter-to-class="translate-x-[0%]"
        leave-active-class="translate-x-[-120%] duration-300"
      >
        <left-panel v-show="!full"></left-panel>
      </transition>

      <!--      属性编辑、位置编辑弹窗    -->
      <point-edit></point-edit>
      <point-move></point-move>
      <polyline-edit></polyline-edit>
      <polyline-move></polyline-move>
      <polygon-edit></polygon-edit>
      <polygon-move></polygon-move>

      <v-map @loaded="onMapLoaded"></v-map>
    </div>
  </div>
</template>

<script setup>
import { getPolygonList } from '@/api/polygon.js';
import { getPolylineList } from '@/api/polyline.js';
import { useEditingPointStore } from '@/store/editingFeature.js';
import PointMove from '@/views/MapView/Dialogs/PointMove.vue';
import PolygonEdit from '@/views/MapView/Dialogs/PolygonEdit.vue';
import PolygonMove from '@/views/MapView/Dialogs/PolygonMove.vue';
import PolylineEdit from '@/views/MapView/Dialogs/PolylineEdit.vue';
import PolylineMove from '@/views/MapView/Dialogs/PolylineMove.vue';
import { ref } from 'vue';
import { getPointList } from '@/api/point.js';
import VMap from '@/components/VMap/index.vue';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import PointEdit from '@/views/MapView/Dialogs/PointEdit.vue';
import LeftPanel from '@/views/MapView/LeftPanel/index.vue';
import TopMenu from '@/views/MapView/TopMenu/index.vue';
import HeaderView from './HeaderView/index.vue';

// 重置所有store，否则会导致路由切换时重复加载
const store = useSavedFeaStore();
store.$reset();
const editingStore = useEditingPointStore();
editingStore.$reset();

function onMapLoaded() {
  const map = getMap();
  getPointList().then(res => {
    const rows = res.data.rows;
    rows.forEach(item => {
      map.mm.addPointLocal(item);
    });
  });
  getPolylineList().then(res => {
    const rows = res.data.rows;
    rows.forEach(item => {
      map.mm.addPolylineLocal(item);
    });
  });
  getPolygonList().then(res => {
    const rows = res.data.rows;
    rows.forEach(item => {
      map.mm.addPolygonLocal(item);
    });
  });
}

const full = ref(false);
</script>

<style scoped lang="less"></style>
