import { premioTranslation } from "../utils/utils"; // Adjust the import path as necessary
import apiCliente from "./apiCliente";


const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleString(); // Formato local con fecha y hora
  };
  

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
            premio: premioTranslation(referido.premio),
            direccion: referido.direccion,
            fecha: obtenerFechaActual(),
            validez: referido.valido,
            horario: referido.horario,
            inscripcion: referido.inscripcion,
            telefonoEscuela: referido.telefonoEscuela,
            oxxo: referido.oxxo,
        };
        console.log("Invoking API referido :", referido);
        const response = await apiCliente.post("/referidos/referido", { payload });
        console.log("Fetching answer:", response.data);
        return response.data; // Returns { question: "your question", answer: "chatbot response" }
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw error;
    }
};