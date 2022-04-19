<template>
  <div class="top-bar flex px-8">
    <div class="flex items-center justify-center">
      <img :src="logo" width="30" height="30" class="mr-[5px]" />
      markMap苗刻地图
      <slot name="left"></slot>
    </div>
    <div class="flex flex-1 items-center justify-end">
      <slot name="right"></slot>
      <el-dropdown size="large">
        <el-link :underline="false">你好，{{ username }}</el-link>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/map-manage')"
              >地图管理</el-dropdown-item
            >
            <el-dropdown-item @click="router.push('/login')"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';

const router = useRouter();
const username = localStorage.getItem('username');
</script>

<style scoped lang="less">
.top-bar {
  height: 80px;
  box-shadow: 0 0 5px 1px #a1a1a1;
}
</style>
