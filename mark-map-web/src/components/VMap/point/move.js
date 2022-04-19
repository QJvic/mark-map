import editPointIcon from '@/assets/imgs/icon/editPoint.png';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPointStore } from '@/store/editingFeature.js';
import { editPoint as apiEditPoint } from '@/api/point.js';
import { ElMessage } from 'element-plus';

export function movePointStart(id) {
  const store = useEditingPointStore();
  if (store.id && store.id !== id) {
    ElMessage.warning({ message: '请先完成正在调整的标注点', duration: 1000 });
    return;
  }

  const map = getMap();
  map.mm.removePop();
  map.mm.enablePop = false;

  const marker = map.getLayer('mPoints').getGeometryById(id);
  const markerLabel = map.getLayer('mPointsLabel').getGeometryById(id);
  map.animateTo({ center: marker.getCoordinates() });
  if (store.id === id) {
    return;
  }

  marker.updateSymbol({ markerFile: editPointIcon });
  marker.config('draggable', true);
  markerLabel.updateSymbol({ textFill: 'red' });
  marker.on('dragstart', () => {
    markerLabel.hide();
  });
  marker.on('dragend', () => {
    markerLabel.show();
    markerLabel.setCoordinates(marker.getCoordinates());
  });

  store.$patch({ moving: true, id });
}

export async function movePointEnd() {
  const map = getMap();
  const store = useEditingPointStore();
  const marker = map.getLayer('mPoints').getGeometryById(store.id);
  await apiEditPoint({ id: store.id, coordinate: marker.getCoordinates() });
  movePointCancel(marker.getCoordinates());
}

export function movePointCancel(endCoord) {
  const map = getMap();
  map.mm.enablePop = true;
  const store = useEditingPointStore();
  if (!store.id) return;

  const marker = map.getLayer('mPoints').getGeometryById(store.id);
  marker.setCoordinates(endCoord || marker.getProperties().coordinate);
  marker.updateSymbol({ markerFile: marker.getProperties().icon });
  marker.config('draggable', false);

  const markerLabel = map.getLayer('mPointsLabel').getGeometryById(store.id);
  markerLabel.updateSymbol({ textFill: '#34495e' });
  markerLabel.setCoordinates(
    endCoord || markerLabel.getProperties().coordinate
  );

  store.$reset();
}
