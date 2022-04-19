<template>
  <div
    class="h-screen w-screen flex items-center justify-center"
    :style="`background: url(${loginBG});background-size:cover`"
  >
    <div
      class="relative flex flex-col items-center justify-center p-16 w-96 bg-white shadow-lg rounded-md"
    >
      <div
        class="title flex absolute top-0 w-11/12 h-20 -translate-y-1/3 rounded-md bg-gradient-to-tr from-sky-200 via-indigo-400 to-blue-400 bg-opacity-95 text-white justify-center items-center text-2xl shadow-lg"
      >
        markMap苗刻地图
      </div>
      <el-form :model="form" ref="formRef" :rules="rules" class="w-full">
        <el-form-item prop="username" class="mt-6">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            class="underline-input"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="mt-6">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            class="underline-input"
          ></el-input>
        </el-form-item>

        <div class="mt-2 flex justify-between align-baseline">
          <el-link type="primary" @click="router.push('/register')">
            注册
          </el-link>
          <el-checkbox v-model="rememberPwd"> 记住密码 </el-checkbox>
        </div>

        <el-button
          @click="onLogin"
          type="primary"
          class="w-full mt-6 transform transition hover:scale-110 motion-reduce:transform-none duration-500"
          plain
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/login';
import loginBG from '@/assets/imgs/login-bg.jpeg';

const router = useRouter();

const form = reactive({ username: '', password: '' });
const formRef = ref(null);
const rules = reactive({
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
});

const rememberPwd = ref(!!localStorage.getItem('rememberPwd'));
if (rememberPwd.value) {
  let loginAuth = localStorage.getItem('loginAuth');
  try {
    loginAuth = atob(loginAuth);
    loginAuth = JSON.parse(loginAuth);
    form.username = loginAuth.username;
    form.password = loginAuth.password;
  } catch (e) {
    console.log('解析错误');
  }
} else {
  form.username = '';
  form.password = '';
  localStorage.removeItem('loginAuth');
}

watch(rememberPwd, val => {
  if (val) localStorage.setItem('rememberPwd', true);
  else localStorage.removeItem('rememberPwd');
});

const onLogin = async function () {
  const [err] = await window.to(formRef.value.validate());
  if (err) return;
  const res = await login(form);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('username', res.data.username);
  if (rememberPwd.value)
    localStorage.setItem('loginAuth', btoa(JSON.stringify(form)));
  await router.push('/map-manage');
  ElMessage.success({ message: '登陆成功', duration: 1000 });
};
</script>

<style scoped lang="less"></style>
