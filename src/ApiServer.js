import axios from 'axios'
const baseURL = 'http://localhost:9000/node'


export const authApi = axios.create({baseURL})

