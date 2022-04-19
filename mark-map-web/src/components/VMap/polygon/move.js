import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolygonStore } from '@/store/editingFeature.js';
import { editPolygon as apiEditPolygon } from '@/api/polygon.js';
import { ElMessage } from 'element-plus';

export function movePolygonStart(id) {
  const store = useEditingPolygonStore();
  if (store.id && store.id !== id) {
    ElMessage.warning({ message: '请先完成正在调整的标注线', duration: 1000 });
    return;
  }

  const map = getMap();
  map.mm.removePop();
  map.mm.enablePop = false;

  const marker = map.getLayer('mPolygon').getGeometryById(id);
  map.animateTo({ center: marker.getCoordinates()[0][0] });
  if (store.id === id) {
    return;
  }

  marker.config('editable', true);
  marker.startEdit();
  store.$patch({ moving: true, id });
}

export async function movePolygonEnd() {
  const map = getMap();
  const store = useEditingPolygonStore();
  const marker = map.getLayer('mPolygon').getGeometryById(store.id);
  await apiEditPolygon({ id: store.id, coordinate: marker.getCoordinates() });
  movePolygonCancel(marker.getCoordinates());
}

export function movePolygonCancel(endCoord) {
  const map = getMap();
  map.mm.enablePop = true;
  const store = useEditingPolygonStore();
  if (!store.id) return;

  const marker = map.getLayer('mPolygon').getGeometryById(store.id);
  marker.setCoordinates(endCoord || marker.getProperties().coordinate);
  marker.config('editable', false);
  marker.endEdit();
  store.$reset();
}
