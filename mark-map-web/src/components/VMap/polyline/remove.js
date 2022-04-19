import { delPolyline } from '@/api/polyline.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import { removeListItem } from '@/utils/removeListItem.js';
import { ElMessageBox } from 'element-plus';

export function removePolylineLocal(id) {
  const map = getMap();

  const layer = map.getLayer('mPolyline');
  const marker = layer.getGeometryById(id);
  marker.remove();

  const savedStore = useSavedFeaStore();
  removeListItem(savedStore.polylineList, { id });
}

export async function removePolyline(id) {
  await delPolyline({ id });
  removePolylineLocal(id);
}

export async function removePolylineConfirm(id) {
  const [err] = await window.to(
    ElMessageBox.confirm('是否确认删除？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
  );
  if (err) return;
  await removePolyline(id);
}
