import { delPoint } from '@/api/point.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import { removeListItem } from '@/utils/removeListItem.js';
import { ElMessageBox } from 'element-plus';

export function removePointLocal(id) {
  const map = getMap();

  const layer = map.getLayer('mPoints');
  const marker = layer.getGeometryById(id);
  marker.remove();

  const labelLayer = map.getLayer('mPointsLabel');
  const labelMarker = labelLayer.getGeometryById(id);
  labelMarker.remove();

  const savedStore = useSavedFeaStore();
  removeListItem(savedStore.pointList, { id });
}

export async function removePoint(id) {
  await delPoint({ id });
  removePointLocal(id);
}

export async function removePointConfirm(id) {
  const [err] = await window.to(
    ElMessageBox.confirm('是否确认删除？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
  );
  if (err) return;
  await removePoint(id);
}
