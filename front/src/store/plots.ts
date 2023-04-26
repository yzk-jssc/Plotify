import { defineStore } from "pinia";

export const usePlotsStore = defineStore('plots', {
  state: () => ({
    plots: [] as GeoJSON.Feature[]
  }),
  actions: {
    createNewPlot(plot: GeoJSON.Feature[]){
      this.plots = [...this.plots, ...plot]
    }
  }
})