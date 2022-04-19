import { defineStore } from 'pinia';

export const useEditingPointStore = defineStore('editingPoint', {
  state: () => ({
    editing: false,
    id: '',
    coordinate: null,
    name: '',
    icon: '',
    tags: [],
    table: [{ key: '', value: '' }],
    moving: false
  }),
  getters: {
    dialogTitle: state => (state.id ? '修改点标注' : '新增点标注')
  }
});

export const useEditingPolylineStore = defineStore('editingPolyline', {
  state: () => ({
    editing: false,
    id: '',
    coordinate: null,
    name: '',
    symbol: {},
    tags: [],
    table: [{ key: '', value: '' }],
    moving: false
  }),
  getters: {
    dialogTitle: state => (state.id ? '修改线标注' : '新增线标注')
  }
});

export const useEditingPolygonStore = defineStore('editingPolygon', {
  state: () => ({
    editing: false,
    id: '',
    coordinate: null,
    name: '',
    symbol: {},
    tags: [],
    table: [{ key: '', value: '' }],
    moving: false
  }),
  getters: {
    dialogTitle: state => (state.id ? '修改面标注' : '新增面标注')
  }
});
