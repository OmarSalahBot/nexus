import axios from "axios";


export const api = axios.create({
    baseURL:  process.env.NODE_ENV == "development" ?  "http://localhost:5000/api" : "https://nexus-backend-5awh.onrender.com/api", 
    withCredentials: true,
});

export default api;
