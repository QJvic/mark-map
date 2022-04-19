import { addPolyline as apiAddPolyline } from '@/api/polyline.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolylineStore } from '@/store/editingFeature.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import * as maptalks from 'maptalks';

export function addPolylineLocal(data) {
  const map = getMap();

  const layer =
    map.getLayer('mPolyline') ||
    new maptalks.VectorLayer('mPolyline', {
      sortByDistanceToCamera: true
    }).addTo(map);

  const { id, coordinate, name, symbol } = data;
  const marker = new maptalks.LineString(coordinate, {
    id,
    cursor: 'pointer',
    symbol,
    properties: {
      ...data
    }
  });
  marker.addTo(layer);

  const savedStore = useSavedFeaStore();
  savedStore.polylineList.unshift(data);
}

export async function addPolyline(data) {
  const reqData = {
    name: data.name,
    coordinate: data.coordinate,
    symbol: data.symbol,
    tags: data.tags,
    table: data.table
  };
  const res = await apiAddPolyline(reqData);
  addPolylineLocal(res.data);
}

export function addPolylineConfirm(data) {
  const store = useEditingPolylineStore();
  store.$patch({
    editing: true,
    ...data
  });
}
