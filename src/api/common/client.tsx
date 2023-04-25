import axios from 'axios'
import Config from '@/config'

export const client = axios.create({
  baseURL: Config.API_URL,
})
