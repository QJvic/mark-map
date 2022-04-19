import { defineStore } from 'pinia';

export const useSavedFeaStore = defineStore('savedPoint', {
  state: () => ({
    pointList: [],
    polygonList: [],
    polylineList: []
  })
});

export const useSearchTxt = defineStore('searchTxt', {
  state: () => ({
    txt: ''
  })
});
