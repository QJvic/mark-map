<template>
  <div class="h-full">
    <div class="px-[15px] overflow-auto" style="height: calc(100%)">
      <div
        v-for="item in showList"
        :key="item.id"
        class="flex items-center m-[10px] p-[10px] border cursor-pointer shadow transform transition hover:scale-110 duration-300"
        @click="onBoxClick(item)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100"
          height="100"
          style="width: 50px; height: 50px"
          viewBox="0,0,100,100"
        >
          <polygon
            points="10,10,10,90,90,90,90,10"
            :style="getSvgStyle(item)"
          />
        </svg>
        <div class="inline-block ml-[20px]">
          <div>{{ item.name }}</div>
          <div>
            <el-button size="small" type="text" @click.stop="onDelClick(item)">
              删除
            </el-button>
            <el-button
              size="small"
              type="text"
              @click.stop="onEditGeoClick(item)"
            >
              图形编辑
            </el-button>
            <el-button
              size="small"
              type="text"
              @click.stop="onEditDataClick(item)"
            >
              属性编辑
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute w-full bottom-0 flex justify-end bg-white">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :pager-count="5"
        :small="true"
        :background="true"
        layout="sizes, pager"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolygonStore } from '@/store/editingFeature.js';
import { computed, ref } from 'vue';
import { useSavedFeaStore } from '@/store/savedFeature.js';

const savedStore = useSavedFeaStore();

const currentPage = ref(1);
const pageSize = ref(5);
const total = computed(() => savedStore.polygonList.length);
const showList = computed(() => {
  return savedStore.polygonList.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});

function onBoxClick(data) {
  const map = getMap();
  const marker = map.getLayer('mPolygon').getGeometryById(data.id);
  map.mm.showPop(marker);
}

async function onDelClick(item) {
  const store = useEditingPolygonStore();
  if (store.id) return;
  const map = getMap();
  await map.mm.removePolygonConfirm(item.id);
}

async function onEditDataClick(item) {
  const map = getMap();
  await map.mm.editPolygonConfirm(item);
}

async function onEditGeoClick(item) {
  const map = getMap();
  map.mm.movePolygonStart(item.id);
}

function getSvgStyle(item) {
  let str = '';
  str += `fill: ${item.symbol.polygonFill};`;
  str += `stroke: ${item.symbol.lineColor};`;
  str += `stroke-width: ${item.symbol.lineWidth};`;
  if (item.symbol.lineDasharray) str += 'stroke-dasharray: 5 5;';
  return str;
}
</script>

<style scoped></style>
