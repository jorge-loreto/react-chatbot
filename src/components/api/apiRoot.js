import axios from "axios";

//const API_BASE_URL = "http://localhost:8080";
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
export const rootApi = async () => {
    try {
        console.error("Invoking API places:");
        const response = await apiClient.get("/places/with-categories");
        console.error("Fetching places:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching places:", error);
        throw error;
    }
};

export default apiClient;