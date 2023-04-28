import axios from 'axios'

const url: string = import.meta.env.VITE_APP_SERVER_API

const instance = axios.create({
  baseURL: url
})

export default instance
