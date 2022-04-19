<template>
  <div class="h-screen">
    <base-header> </base-header>
    <map-card
      v-for="item in maps"
      :key="item.id"
      :data="item"
      @updated="getData"
    ></map-card>
    <map-card-add @added="getData"></map-card-add>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseHeader from '@/components/BaseHeader/index.vue';
import MapCard from '@/views/MapManage/components/MapCard.vue';
import MapCardAdd from '@/views/MapManage/components/MapCardAdd.vue';
import { getMaps } from '@/api/map.js';

const maps = ref([]);
function getData() {
  getMaps().then(res => {
    maps.value = res.data.rows;
  });
}
getData();
</script>

<style scoped></style>
