import { defineStore } from "pinia";
import * as plotApi from '../service/plot.service'
import { PlotRequestData } from "../types/plots.service";

export const usePlotsStore = defineStore('plots', {
  state: () => ({
    plots: [] as GeoJSON.Feature[]
  }),
  actions: {
    createNewPlotLocally(plot: GeoJSON.Feature){
      this.plots = [plot, ...this.plots]
    },
    createNewPlot(plot: GeoJSON.Feature, zoom: number){
      if(typeof plot.id === 'string'){
        const data:PlotRequestData = {
          featureId: plot.id,
          //evading float numbers
          zoom: Math.floor(zoom),
          feature: plot
        }
        plotApi.createNewPlot(data)
        this.createNewPlotLocally(plot)
      }
    },
    async getAllPlots(): Promise<GeoJSON.Feature[]>{
      const allPlots = await plotApi.getAllPlots()
      this.plots = [...allPlots]
      return this.plots
    }
  }
})