import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolylineStore } from '@/store/editingFeature.js';
import { editPolyline as apiEditPolyline } from '@/api/polyline.js';
import { ElMessage } from 'element-plus';

export function movePolylineStart(id) {
  const store = useEditingPolylineStore();
  if (store.id && store.id !== id) {
    ElMessage.warning({ message: '请先完成正在调整的标注线', duration: 1000 });
    return;
  }

  const map = getMap();
  map.mm.removePop();
  map.mm.enablePop = false;

  const marker = map.getLayer('mPolyline').getGeometryById(id);
  map.animateTo({ center: marker.getCoordinates()[0] });
  if (store.id === id) {
    return;
  }

  marker.config('editable', true);
  marker.startEdit();
  store.$patch({ moving: true, id });
}

export async function movePolylineEnd() {
  const map = getMap();
  const store = useEditingPolylineStore();
  const marker = map.getLayer('mPolyline').getGeometryById(store.id);
  await apiEditPolyline({ id: store.id, coordinate: marker.getCoordinates() });
  movePolylineCancel(marker.getCoordinates());
}

export function movePolylineCancel(endCoord) {
  const map = getMap();
  map.mm.enablePop = true;
  const store = useEditingPolylineStore();
  if (!store.id) return;

  const marker = map.getLayer('mPolyline').getGeometryById(store.id);
  marker.setCoordinates(endCoord || marker.getProperties().coordinate);
  marker.config('editable', false);
  marker.endEdit();
  store.$reset();
}
