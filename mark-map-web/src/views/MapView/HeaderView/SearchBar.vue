<template>
  <el-input
    v-model="store.txt"
    size="large"
    clearable
    placeholder="标注搜索，请输入标注名称"
    style="min-width: 400px; max-width: 55%"
  >
    <template #append>
      <el-button type="primary">搜索</el-button>
    </template>
  </el-input>
</template>

<script setup>
import { useSearchTxt } from '@/store/savedFeature.js';

const store = useSearchTxt();
</script>
<style scoped></style>
