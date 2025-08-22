import apiCliente from "./apiCliente";

// Function to send a question in the request body
export const askQuestion = async (question) => {
    try {
        console.log("Invoking API asking question:", question);
        const response = await apiCliente.post("/chat/askMaster", { question });
        console.log("Fetching answer:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw error;
    }
};
