import axios from "axios";

//const API_BASE_URL = "http://localhost:8080";
//const API_BASE_URL = "http://192.168.1.121:5000";
//const API_BASE_URL = "https://34.51.36.4:5000";
//const API_BASE_URL ="https://my-iteci-app-1095159323845.us-central1.run.app"
const API_BASE_URL =process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Function to send a question in the request body
export const askQuestion = async ( place, course, question) => {
    try {
        const payload = {
            id: "id-abc123-test",
            place: place, // Ya tienes estos valores listos
            categoryId: course,
            question: question,
            answer: "Buscando-respuesta"
        };
        console.log("Invoking API asking question:", question);
        console.log("Invoking API asking payload:", payload);
        const response = await apiClient.post("/chat/askMaster",  payload );
        console.log("Fetching answer:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw error;
    }
};

export default apiClient;