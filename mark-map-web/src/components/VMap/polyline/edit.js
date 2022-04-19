import { getMap } from '@/components/VMap/mapInstance.js';
import { editPolyline as apiEditPolyline } from '@/api/polyline.js';
import router from '@/router/index.js';
import { useEditingPolylineStore } from '@/store/editingFeature.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';

export function editPolylineLocal(data) {
  const { id, coordinate, symbol, name } = data;

  const map = getMap();

  const layer = map.getLayer('mPolyline');
  const marker = layer.getGeometryById(id);
  marker.setCoordinates(coordinate);
  marker.updateSymbol(symbol);
  marker.setProperties(data);

  const store = useSavedFeaStore();
  const polylineList = store.polylineList;
  for (let i = 0; i < polylineList.length; i++) {
    if (polylineList[i].id === data.id) {
      polylineList[i] = data;
      break;
    }
  }
}

export async function editPolyline(data) {
  const reqData = {
    mapId: router.currentRoute.value.query.id, // todo: mapId需要采用更安全的方式获取
    name: data.name,
    coordinate: data.coordinate,
    symbol: data.symbol,
    tags: data.tags,
    table: data.table,
    id: data.id
  };
  await apiEditPolyline(reqData);
  editPolylineLocal(reqData);
}

export async function editPolylineConfirm(data) {
  const store = useEditingPolylineStore();
  if (store.id) return; // 如果已有就不弹出了，防止和位置编辑冲突
  store.$patch({
    editing: true,
    ...data
  });
}
