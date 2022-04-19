import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  // 超时
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    const code = res.data.code || 200;
    const message = res.data.message;
    if (code === 401) {
      localStorage.removeItem('token');
      ElMessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          location.href = '/login';
        })
        .catch(() => {});
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 500) {
      ElMessage({
        message: res.data.message,
        type: 'error'
      });
      return Promise.reject(new Error(message));
    } else if (code !== 200) {
      Notification.error({
        title: message
      });
      return Promise.reject('error');
    } else {
      return res.data;
    }
  },
  error => {
    console.log('err' + error);
    let { message } = error;
    if (message === 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
