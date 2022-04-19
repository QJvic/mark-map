<template>
  <div id="v-map"></div>
</template>

<script>
export default {
  name: 'VMap'
};
</script>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import * as maptalks from 'maptalks';
import CRSTransform from '@/assets/lib/chncrs.js';
import { getMap, setMap } from '@/components/VMap/mapInstance.js';

const emit = defineEmits(['loaded']);
onMounted(() => {
  const map = initMap();
  setMap(map);
  emit('loaded', map);
});

onBeforeUnmount(() => {
  const map = getMap();
  map.remove();
});

function initMap() {
  const map = new maptalks.Map('v-map', {
    center: [120.34131345694448, 31.538004635017245],
    maxZoom: 18,
    minZoom: 3,
    zoom: 10,
    attribution: false
  });

  const baseLayer = new maptalks.TileLayer('base', {
    urlTemplate:
      '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
    offset: function (z) {
      //实时计算wgs84和gcj02瓦片的偏移量
      const center = map.getCenter();
      const c = CRSTransform.transform(center.toArray(), 'GCJ02', 'WGS84');
      const offset = map
        .coordToPoint(center, z)
        ._sub(map.coordToPoint(new maptalks.Coordinate(c), z));
      return offset._round().toArray();
    }
  });
  baseLayer.addTo(map);

  return map;
}
</script>

<style scoped lang="less">
#v-map {
  width: 100%;
  height: 100%;
}
</style>
