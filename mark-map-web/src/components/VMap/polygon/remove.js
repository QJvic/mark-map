import { delPolygon } from '@/api/polygon.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import { removeListItem } from '@/utils/removeListItem.js';
import { ElMessageBox } from 'element-plus';

export function removePolygonLocal(id) {
  const map = getMap();

  const layer = map.getLayer('mPolygon');
  const marker = layer.getGeometryById(id);
  marker.remove();

  const savedStore = useSavedFeaStore();
  removeListItem(savedStore.polygonList, { id });
}

export async function removePolygon(id) {
  await delPolygon({ id });
  removePolygonLocal(id);
}

export async function removePolygonConfirm(id) {
  const [err] = await window.to(
    ElMessageBox.confirm('是否确认删除？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
  );
  if (err) return;
  await removePolygon(id);
}
