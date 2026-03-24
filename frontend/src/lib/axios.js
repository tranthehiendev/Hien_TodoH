import axios from "axios";
const BARE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/api": "/api"
const api = axios.create(
    {
        baseURL:BARE_URL
    }
)
export default api;