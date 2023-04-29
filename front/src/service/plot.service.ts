import axios from '../axios'
import { PlotRequestData, PlotResponseData } from '../types/plots.service';

export async function createNewPlot(data: PlotRequestData){
  try {
    const newPlot = axios.post('/api/plots', {
      data
    })
    return newPlot
  } catch (error) {
    throw Promise.reject(error)
  }
}

export async function getAllPlots(){
  try {
    const allPlotsResponse = await axios.get('/api/plots')
    const allPlotsData: PlotResponseData[] = allPlotsResponse.data.data
    const featuresFromData: GeoJSON.Feature[] = allPlotsData.map((plot) => {
      return plot.attributes.feature
    })
    console.log(featuresFromData)
    return featuresFromData
  } catch (error) {
    throw Promise.reject(error)
  }
}