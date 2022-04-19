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

      <div class="w-full">
        <el-link type="primary" @click="router.push('/login')">
          <el-icon><arrow-left-bold /></el-icon> 返回登陆
        </el-link>
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
        <el-form-item prop="password2" class="mt-6">
          <el-input
            v-model="form.password2"
            type="password"
            placeholder="请再次输入密码"
            class="underline-input"
          ></el-input>
        </el-form-item>
        <el-button
          @click="onRegister"
          :loading="btnLoading"
          type="primary"
          class="w-full mt-6 transform transition hover:scale-110 motion-reduce:transform-none duration-500"
          plain
        >
          注册
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
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/login';
import loginBG from '@/assets/imgs/login-bg.jpeg';

const router = useRouter();

const form = reactive({ username: '', password: '', password2: '' });
const formRef = ref(null);

const validPwd2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一直，请重新输入'));
  } else {
    callback();
  }
};

const rules = reactive({
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
  password2: { validator: validPwd2, trigger: 'blur' }
});

const btnLoading = ref(false);
async function onRegister() {
  const [err] = await window.to(formRef.value.validate());
  if (err) return;
  btnLoading.value = true;
  const [err2] = await window.to(
    register({
      username: form.username,
      password: form.password
    })
  );
  if (err2) {
    btnLoading.value = false;
    return;
  }
  ElMessage.success({ message: '创建成功，即将返回登陆页面', duration: 500 });
  setTimeout(() => {
    btnLoading.value = true;
    router.push('/login');
  }, 500);
}
</script>

<style scoped lang="less"></style>
