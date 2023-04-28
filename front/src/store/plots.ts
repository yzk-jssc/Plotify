import { defineStore } from "pinia";
import * as plotApi from '../service/plot.service'
import { Plot } from "../types/create";

export const usePlotsStore = defineStore('plots', {
  state: () => ({
    plots: [] as GeoJSON.Feature[]
  }),
  actions: {
    createNewPlotLocally(plot: GeoJSON.Feature[]){
      this.plots = [...this.plots, ...plot]
    },
    // workaround
    // do types later
    createNewPlot(plot: any){
      this.createNewPlotLocally(plot)
      if(typeof plot[0].id === 'string'){
        const data: Plot = {
          featureId: plot[0].id,
          plotcoordinations: plot[0].geometry.coordinates
        }
        plotApi.createNewPlot(data)
      }
    }
  }
})