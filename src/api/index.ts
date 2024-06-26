import axios from 'axios'

axios.defaults.baseURL=import.meta.env.BASE_URL;

// 前端调用后端接口
const api = {
    login(body:any){
        return axios.post('/login',body)
    }
}

export default api