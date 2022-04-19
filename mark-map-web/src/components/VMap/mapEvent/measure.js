import { getMap } from '@/components/VMap/mapInstance.js';
import * as maptalks from 'maptalks';

export function initMeasure() {
  initMeasureDistance();
  initMeasureArea();
}

function initMeasureDistance() {
  const map = getMap();
  const distanceTool = new maptalks.DistanceTool({
    symbol: {
      lineColor: '#34495e',
      lineWidth: 2
    },
    vertexSymbol: {
      markerType: 'ellipse',
      markerFill: '#1bbc9b',
      markerLineColor: '#000',
      markerLineWidth: 3,
      markerWidth: 10,
      markerHeight: 10
    },

    labelOptions: {
      textSymbol: {
        textFaceName: 'monospace',
        textFill: '#fff',
        textLineSpacing: 1,
        textHorizontalAlignment: 'right',
        textDx: 15,
        markerLineColor: '#b4b3b3',
        markerFill: '#000'
      },
      boxStyle: {
        padding: [6, 2],
        symbol: {
          markerType: 'square',
          markerFill: '#000',
          markerFillOpacity: 0.9,
          markerLineColor: '#b4b3b3'
        }
      }
    },
    clearButtonSymbol: [
      {
        markerType: 'square',
        markerFill: '#000',
        markerLineColor: '#b4b3b3',
        markerLineWidth: 2,
        markerWidth: 15,
        markerHeight: 15,
        markerDx: 20
      },
      {
        markerType: 'x',
        markerWidth: 10,
        markerHeight: 10,
        markerLineColor: '#fff',
        markerDx: 20
      }
    ],
    language: 'zh-CN'
  });
  distanceTool.on('enable', () => {
    map.setCursor('crosshair');
  });
  distanceTool.on('disable', () => {
    map.setCursor('default');
  });
  distanceTool.on('drawend', () => {
    distanceTool.disable();
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      distanceTool.disable();
      distanceTool.clear();
    }
  });
  distanceTool.addTo(map);
  distanceTool.disable();

  map.mm.distanceTool = distanceTool;
}

function initMeasureArea() {
  const map = getMap();
  const areaTool = new maptalks.AreaTool({
    symbol: {
      lineColor: '#1bbc9b',
      lineWidth: 2,
      polygonFill: '#8b8585',
      polygonOpacity: 0.5
    },
    vertexSymbol: {
      markerType: 'ellipse',
      markerFill: '#34495e',
      markerLineColor: '#1bbc9b',
      markerLineWidth: 3,
      markerWidth: 10,
      markerHeight: 10
    },
    labelOptions: {
      textSymbol: {
        textFaceName: 'monospace',
        textFill: '#fff',
        textLineSpacing: 1,
        textHorizontalAlignment: 'right',
        textDx: 15
      },
      boxStyle: {
        padding: [6, 2],
        symbol: {
          markerType: 'square',
          markerFill: '#000',
          markerFillOpacity: 0.9,
          markerLineColor: '#b4b3b3'
        }
      }
    },
    clearButtonSymbol: [
      {
        markerType: 'square',
        markerFill: '#000',
        markerLineColor: '#b4b3b3',
        markerLineWidth: 2,
        markerWidth: 15,
        markerHeight: 15,
        markerDx: 22
      },
      {
        markerType: 'x',
        markerWidth: 10,
        markerHeight: 10,
        markerLineColor: '#fff',
        markerDx: 22
      }
    ],
    language: 'zh-CN'
  });
  areaTool.addTo(map);
  areaTool.on('enable', () => {
    map.setCursor('crosshair');
  });
  areaTool.on('disable', () => {
    map.setCursor('default');
  });
  areaTool.on('drawend', () => {
    areaTool.disable();
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      areaTool.disable();
      areaTool.clear();
    }
  });
  areaTool.addTo(map);
  areaTool.disable();

  map.mm.areaTool = areaTool;
}
