//const API_BASE_URL = "http://localhost:5000";
//const API_BASE_URL = "http://192.168.1.121:5000";
//const API_BASE_URL = "https://34.51.36.4:5000";
//const API_BASE_URL ="https://my-iteci-app-1095159323845.us-central1.run.app"
import axios from "axios";

const API_BASE_URL =process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const apiReferidos = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Function to send a question in the request body
export const askRefer = async (referido) => {
    try {
        const payload = {
            id: referido.id, // Ya tienes estos valores listos
            nombre: referido.nombre, // Ya tienes estos valores listos
            email: referido.email, // Ya tienes estos valores listos
            celular: referido.celular, // Ya tienes estos valores listos
            plantel: referido.plantel, // Ya tienes estos valores listos
            category: referido.category, // Ya tienes estos valores listos
            fechaInicio: referido.fechaInicio,
            premio: referido.premio,
            fecha: referido.fecha,
            valido: referido.valido,
            horario: referido.horario
        };
        console.error("Invoking API referido :", referido);
        const response = await apiReferidos.post("/referidos/referido", { payload });
        console.error("Fetching answer:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw error;
    }
};

export default apiReferidos;