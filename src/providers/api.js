import axios from "axios";

const client = axios.create({baseURL: process.env.REACT_APP_API_URL || 'https://localhost' })
client.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}` 
    return config;
});

export default client;
