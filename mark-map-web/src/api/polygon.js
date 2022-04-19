import router from '@/router/index.js';
import request from '@/utils/request.js';

export function getPolygonList(mapId) {
  if (!mapId) mapId = router.currentRoute.value.query.id;
  return request('/polygon/list?mapId=' + mapId);
}

export function addPolygon(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polygon/add', data);
}

export function editPolygon(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polygon/edit', data);
}

export function delPolygon(data) {
  const mapId = router.currentRoute.value.query.id;
  if (!data.mapId && mapId) {
    data.mapId = mapId;
  }
  return request.post('/polygon/del', data);
}
