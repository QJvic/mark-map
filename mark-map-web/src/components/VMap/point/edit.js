import { getMap } from '@/components/VMap/mapInstance.js';
import { editPoint as apiEditPoint } from '@/api/point.js';
import router from '@/router/index.js';
import { useEditingPointStore } from '@/store/editingFeature.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';

export function editPointLocal(data) {
  const { id, coordinate, icon, name } = data;

  const map = getMap();

  const layer = map.getLayer('mPoints');
  const marker = layer.getGeometryById(id);
  marker.setCoordinates(coordinate);
  marker.updateSymbol({
    markerFile: icon
  });
  marker.setProperties(data);

  const labelLayer = map.getLayer('mPointsLabel');
  const labelMarker = labelLayer.getGeometryById(id);
  labelMarker.setCoordinates(coordinate);
  labelMarker.updateSymbol({
    textName: name
  });
  labelMarker.setProperties(data);

  const store = useSavedFeaStore();
  const pointList = store.pointList;
  for (let i = 0; i < pointList.length; i++) {
    if (pointList[i].id === data.id) {
      pointList[i] = data;
      break;
    }
  }
}

export async function editPoint(data) {
  const reqData = {
    mapId: router.currentRoute.value.query.id, // todo: mapId需要采用更安全的方式获取
    name: data.name,
    coordinate: data.coordinate,
    icon: data.icon,
    tags: data.tags,
    table: data.table,
    id: data.id
  };
  await apiEditPoint(reqData);
  editPointLocal(reqData);
}

export async function editPointConfirm(data) {
  const store = useEditingPointStore();
  if (store.id) return; // 如果已有就不弹出了，防止和位置编辑冲突
  store.$patch({
    editing: true,
    ...data
  });
}
