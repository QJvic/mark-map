import router from '@/router/index.js';
import request from '@/utils/request.js';

export function getPointList(mapId) {
  if (!mapId) mapId = router.currentRoute.value.query.id;
  return request('/point/list?mapId=' + mapId);
}

export function addPoint(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/point/add', data);
}

export function editPoint(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/point/edit', data);
}

export function delPoint(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/point/del', data);
}
