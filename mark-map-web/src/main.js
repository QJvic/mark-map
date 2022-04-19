import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import * as maptalks from 'maptalks';
import App from './App.vue';
import router from './router';
import './styles/index.less';
import '@/assets/iconfont/iconfont.css';
import clickOutSide from '@/directives/clickOutSide.js';
import to from './utils/to.js';

window.to = to;

// maptalks的每个元素创建时都添加mm对象，自定义方法和属性附加在mm上
maptalks.Class.addInitHook(function () {
  this.mm = {};
});

if (import.meta.env.VITE_APP_NODE_ENV !== 'prod-cdn') {
  import('element-plus/theme-chalk/index.css');
}

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .directive('clickOutSide', clickOutSide)
  .mount('#app');
