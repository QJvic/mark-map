import { getMap } from '@/components/VMap/mapInstance.js';
import { editPolygon as apiEditPolygon } from '@/api/polygon.js';
import router from '@/router/index.js';
import { useEditingPolygonStore } from '@/store/editingFeature.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';

export function editPolygonLocal(data) {
  const { id, coordinate, symbol, name } = data;

  const map = getMap();

  const layer = map.getLayer('mPolygon');
  const marker = layer.getGeometryById(id);
  marker.setCoordinates(coordinate);
  marker.updateSymbol(symbol);
  marker.setProperties(data);

  const store = useSavedFeaStore();
  const polygonList = store.polygonList;
  for (let i = 0; i < polygonList.length; i++) {
    if (polygonList[i].id === data.id) {
      polygonList[i] = data;
      break;
    }
  }
}

export async function editPolygon(data) {
  const reqData = {
    mapId: router.currentRoute.value.query.id, // todo: mapId需要采用更安全的方式获取
    name: data.name,
    coordinate: data.coordinate,
    symbol: data.symbol,
    tags: data.tags,
    table: data.table,
    id: data.id
  };
  await apiEditPolygon(reqData);
  editPolygonLocal(reqData);
}

export async function editPolygonConfirm(data) {
  const store = useEditingPolygonStore();
  if (store.id) return; // 如果已有就不弹出了，防止和位置编辑冲突
  store.$patch({
    editing: true,
    ...data
  });
}
