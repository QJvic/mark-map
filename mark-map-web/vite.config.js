const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from 'vite-plugin-eslint';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import htmlPlugin from 'vite-plugin-html-config';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(mode => {
  const isCDN = mode.mode === 'prod-cdn';
  // 打包排除
  const externalPlugin = viteExternalsPlugin({
    vue: 'Vue',
    'vue-router': 'VueRouter',
    pinia: 'Pinia',
    axios: 'axios',
    'element-plus': 'ElementPlus',
    maptalks: 'maptalks'
  });
  // head中添加
  const htmlAppendPlugin = htmlPlugin({
    links: [
      '//cdn.staticfile.org/element-plus/2.1.9/theme-chalk/index.min.css'
    ].map(item => ({ rel: 'stylesheet', href: item })),
    headScripts: [
      '//cdn.staticfile.org/vue/3.2.33/vue.global.min.js',
      '//cdn.staticfile.org/vue-router/4.0.14/vue-router.global.min.js',
      '//cdn.staticfile.org/vue-demi/0.12.5/index.iife.min.js',
      '//cdn.staticfile.org/pinia/2.0.13/pinia.iife.prod.min.js',
      '//cdn.staticfile.org/axios/0.26.1/axios.min.js',
      '//cdn.staticfile.org/element-plus/2.1.9/index.full.min.js',
      '//cdn.staticfile.org/maptalks/1.0.0-rc.3/maptalks.min.js'
    ].map(item => ({ src: item }))
  });
  const cdnPlugin = isCDN ? [externalPlugin, htmlAppendPlugin] : [];

  return {
    base: './',
    server: {
      port: 8080
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    plugins: [
      vue(),
      vueJsx({}),
      eslintPlugin({ cache: false }),
      // visualizer({ open: true, gzipSize: true, brotliSize: true }),
      ...cdnPlugin
    ]
  };
});
