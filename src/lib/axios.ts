import axios from "axios";


export const api = axios.create({
    baseURL:  "https://nexus-backend-5awh.onrender.com/api", 
    withCredentials: true,
});

export default api;
