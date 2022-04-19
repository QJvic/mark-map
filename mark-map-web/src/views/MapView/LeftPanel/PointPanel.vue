<template>
  <div class="h-full">
    <div class="px-[15px] overflow-auto" style="height: calc(100%)">
      <div
        v-for="item in showList"
        :key="item.id"
        class="flex items-center m-[10px] p-[10px] border cursor-pointer shadow transform transition hover:scale-110 duration-300"
        @click="onBoxClick(item)"
      >
        <img :src="item.icon" class="h-[32px] w-[32px] inline-block" />
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
import { useEditingPointStore } from '@/store/editingFeature.js';
import { computed, ref } from 'vue';
import { useSavedFeaStore, useSearchTxt } from '@/store/savedFeature.js';

const savedStore = useSavedFeaStore();
const searchStore = useSearchTxt();

const currentPage = ref(1);
const pageSize = ref(5);
const total = computed(() => savedStore.pointList.length);
const showList = computed(() => {
  const filterList = savedStore.pointList.filter(item => {
    if (searchStore.txt === '') return true;
    else return item.name.includes(searchStore.txt);
  });
  return filterList.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});

function onBoxClick(data) {
  const map = getMap();
  const marker = map.getLayer('mPoints').getGeometryById(data.id);
  map.mm.showPop(marker);
}

async function onDelClick(item) {
  const store = useEditingPointStore();
  if (store.id) return;
  const map = getMap();
  await map.mm.removePointConfirm(item.id);
}

async function onEditDataClick(item) {
  const map = getMap();
  await map.mm.editPointConfirm(item);
}

async function onEditGeoClick(item) {
  const map = getMap();
  map.mm.movePointStart(item.id);
}
</script>

<style scoped></style>
