import { Plot } from "../types/create";
import axios from '../axios'

export async function createNewPlot(data: Plot){
  try {
    const newPlot = axios.post('/api/plots', {
      data
    })
    return newPlot
  } catch (error) {
    throw Promise.reject(error)
  }
}