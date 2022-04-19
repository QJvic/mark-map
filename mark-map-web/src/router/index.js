import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/map',
    name: 'mapView',
    meta: {
      auth: true
    },
    component: () => import('@/views/MapView/index.vue')
  },
  {
    path: '/map-manage',
    name: 'mapManage',
    meta: {
      auth: true
    },
    component: () => import('@/views/MapManage/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  else document.title = 'markMap苗刻地图';
  if (!localStorage.getItem('token') && to.meta.auth) {
    ElMessage.warning({ message: '请先登录', duration: 1000 });
    setTimeout(() => router.push('/login'), 1000);
  } else next();
});

export default router;
