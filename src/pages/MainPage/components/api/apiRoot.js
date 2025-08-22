import apiCliente from "./apiCliente";

// Function to send a question in the request body
export const rootApi = async () => {
    try {
        console.log("Invoking API places:");
        const response = await apiCliente.get("/locations/all");
        console.log("Fetching places:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching places:", error);
        throw error;
    }
};