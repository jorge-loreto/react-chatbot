
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const USERNAME = process.env.REACT_APP_API_USER || "admin";
const PASSWORD = process.env.REACT_APP_API_PASS || "admin123";

const apiCliente = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
    withCredentials: true
});

export default apiCliente;
