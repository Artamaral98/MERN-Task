import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mern-task-deploy-alpha.vercel.app/api'
})

export default api