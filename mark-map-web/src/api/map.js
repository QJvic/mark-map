import request from '@/utils/request.js';

export function getMaps() {
  return request.get('/map/list');
}

export function delMap(id) {
  return request.post('/map/del', { mapId: id });
}

export function addMap(data) {
  return request.post('/map/add', data);
}

export function updateMap(data) {
  return request.post('/map/update', data);
}
