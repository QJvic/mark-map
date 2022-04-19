<template>
  <base-header class="z-10">
    <template #right>
      <search-bar class="mr-[20px]"></search-bar>
    </template>
  </base-header>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader/index.vue';
import SearchBar from '@/views/MapView/HeaderView/SearchBar.vue';
</script>
