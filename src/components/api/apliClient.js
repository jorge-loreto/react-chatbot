import axios from "axios";

//const API_BASE_URL = "http://localhost:5000";
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
export const askQuestion = async (question) => {
    try {
        console.error("Invoking API asking question:", question);
        const response = await apiClient.post("/chat/askMaster", { question });
        console.error("Fetching answer:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw error;
    }
};

export default apiClient;