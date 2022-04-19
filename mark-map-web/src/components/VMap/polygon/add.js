import { addPolygon as apiAddPolygon } from '@/api/polygon.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolygonStore } from '@/store/editingFeature.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import * as maptalks from 'maptalks';

export function addPolygonLocal(data) {
  const map = getMap();

  const layer =
    map.getLayer('mPolygon') ||
    new maptalks.VectorLayer('mPolygon', {
      sortByDistanceToCamera: true
    }).addTo(map);

  const { id, coordinate, name, symbol } = data;
  const marker = new maptalks.Polygon(coordinate, {
    id,
    cursor: 'pointer',
    symbol,
    properties: {
      ...data
    }
  });
  marker.addTo(layer);

  const savedStore = useSavedFeaStore();
  savedStore.polygonList.unshift(data);
}

export async function addPolygon(data) {
  const reqData = {
    name: data.name,
    coordinate: data.coordinate,
    symbol: data.symbol,
    tags: data.tags,
    table: data.table
  };
  const res = await apiAddPolygon(reqData);
  addPolygonLocal(res.data);
}

export function addPolygonConfirm(data) {
  const store = useEditingPolygonStore();
  store.$patch({
    editing: true,
    ...data
  });
}
