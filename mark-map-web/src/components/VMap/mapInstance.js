import { initMarkerClick } from '@/components/VMap/mapEvent/markerClick.jsx';
import { initMeasure } from '@/components/VMap/mapEvent/measure.js';
import {
  addPoint,
  addPointConfirm,
  addPointLocal
} from '@/components/VMap/point/add.js';
import {
  editPoint,
  editPointConfirm,
  editPointLocal
} from '@/components/VMap/point/edit.js';
import {
  movePointCancel,
  movePointEnd,
  movePointStart
} from '@/components/VMap/point/move.js';
import {
  removePoint,
  removePointConfirm,
  removePointLocal
} from '@/components/VMap/point/remove.js';
import {
  addPolygonConfirm,
  addPolygonLocal,
  addPolygon
} from '@/components/VMap/polygon/add.js';
import {
  editPolygonConfirm,
  editPolygonLocal,
  editPolygon
} from '@/components/VMap/polygon/edit.js';
import {
  movePolygonCancel,
  movePolygonEnd,
  movePolygonStart
} from '@/components/VMap/polygon/move.js';
import {
  removePolygon,
  removePolygonConfirm,
  removePolygonLocal
} from '@/components/VMap/polygon/remove.js';
import {
  addPolyline,
  addPolylineConfirm,
  addPolylineLocal
} from '@/components/VMap/polyline/add.js';
import {
  editPolyline,
  editPolylineConfirm,
  editPolylineLocal
} from '@/components/VMap/polyline/edit.js';
import {
  movePolylineCancel,
  movePolylineEnd,
  movePolylineStart
} from '@/components/VMap/polyline/move.js';
import {
  removePolyline,
  removePolylineConfirm,
  removePolylineLocal
} from '@/components/VMap/polyline/remove.js';

let mapInstance;

export function setMap(map) {
  mapInstance = map;
  // Point
  map.mm.addPointLocal = addPointLocal;
  map.mm.addPoint = addPoint;
  map.mm.addPointConfirm = addPointConfirm;
  map.mm.removePointLocal = removePointLocal;
  map.mm.removePoint = removePoint;
  map.mm.removePointConfirm = removePointConfirm;
  map.mm.editPointLocal = editPointLocal;
  map.mm.editPoint = editPoint;
  map.mm.editPointConfirm = editPointConfirm;
  map.mm.movePointStart = movePointStart;
  map.mm.movePointEnd = movePointEnd;
  map.mm.movePointCancel = movePointCancel;
  // Polyline
  map.mm.addPolylineLocal = addPolylineLocal;
  map.mm.addPolyline = addPolyline;
  map.mm.addPolylineConfirm = addPolylineConfirm;
  map.mm.removePolylineLocal = removePolylineLocal;
  map.mm.removePolyline = removePolyline;
  map.mm.removePolylineConfirm = removePolylineConfirm;
  map.mm.editPolylineLocal = editPolylineLocal;
  map.mm.editPolyline = editPolyline;
  map.mm.editPolylineConfirm = editPolylineConfirm;
  map.mm.movePolylineStart = movePolylineStart;
  map.mm.movePolylineEnd = movePolylineEnd;
  map.mm.movePolylineCancel = movePolylineCancel;
  // Polygon
  map.mm.addPolygonLocal = addPolygonLocal;
  map.mm.addPolygon = addPolygon;
  map.mm.addPolygonConfirm = addPolygonConfirm;
  map.mm.removePolygonLocal = removePolygonLocal;
  map.mm.removePolygon = removePolygon;
  map.mm.removePolygonConfirm = removePolygonConfirm;
  map.mm.editPolygonLocal = editPolygonLocal;
  map.mm.editPolygon = editPolygon;
  map.mm.editPolygonConfirm = editPolygonConfirm;
  map.mm.movePolygonStart = movePolygonStart;
  map.mm.movePolygonEnd = movePolygonEnd;
  map.mm.movePolygonCancel = movePolygonCancel;
  // event
  initMarkerClick();
  initMeasure();
}

export function getMap() {
  return mapInstance;
}
