import router from '@/router/index.js';
import request from '@/utils/request.js';

export function getPolylineList(mapId) {
  if (!mapId) mapId = router.currentRoute.value.query.id;
  return request('/polyline/list?mapId=' + mapId);
}

export function addPolyline(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polyline/add', data);
}

export function editPolyline(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polyline/edit', data);
}

export function delPolyline(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polyline/del', data);
}
