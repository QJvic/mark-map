import request from '@/utils/request.js';

export function getPointIconList() {
  return request('/pointIcon/list');
}

export function addPointIcon(data) {
  return request.post('/pointIcon/add', data);
}
