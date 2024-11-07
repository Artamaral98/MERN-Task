import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mern-task-1-5yik.onrender.com'
})

export default api
