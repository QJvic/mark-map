import { useEditingPointStore } from '@/store/editingFeature.js';
import * as maptalks from 'maptalks';
import { CollisionLayer } from '@/assets/lib/maptalks.collisionLayer.js';
import { useSavedFeaStore } from '@/store/savedFeature.js';
import { getMap } from '@/components/VMap/mapInstance.js';
import { addPoint as apiAddPoint } from '@/api/point.js';

export function addPointLocal(data) {
  const { id, coordinate, icon, name } = data;

  const map = getMap();

  // 图标
  const layer =
    map.getLayer('mPoints') ||
    new maptalks.VectorLayer('mPoints', {
      sortByDistanceToCamera: true
    }).addTo(map);
  const marker = new maptalks.Marker(coordinate, {
    id,
    cursor: 'pointer',
    symbol: {
      markerFile: icon,
      markerWidth: 32,
      markerHeight: 32
    },
    properties: {
      ...data
    }
  });
  marker.addTo(layer);

  // 文字，开启碰撞💥检测
  const labelLayer =
    map.getLayer('mPointsLabel') ||
    new CollisionLayer('mPointsLabel', {
      sortByDistanceToCamera: true,
      collision: true
    }).addTo(map);
  const labelMarker = new maptalks.Marker(coordinate, {
    id,
    symbol: {
      textName: name,
      textFill: '#34495e',
      textSize: 16,
      textDy: 10,
      textHaloFill: '#ffffff',
      textHaloRadius: 2
    },
    properties: {
      ...data
    }
  });
  labelMarker.addTo(labelLayer);

  const savedStore = useSavedFeaStore();
  savedStore.pointList.unshift(data);
}

export async function addPoint(data) {
  const reqData = {
    name: data.name,
    coordinate: data.coordinate,
    icon: data.icon,
    tags: data.tags,
    table: data.table
  };
  const res = await apiAddPoint(reqData);
  addPointLocal(res.data);
}

export async function addPointConfirm(data) {
  const store = useEditingPointStore();
  store.$patch({
    editing: true,
    ...data
  });
}
