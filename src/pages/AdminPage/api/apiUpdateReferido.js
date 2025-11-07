// src/api/referidosApi.js
import apiCliente from "./apiCliente";


export const updateReferido = async (referidou) => {
  try {
    const response = await apiCliente.put(`/referidos/referido`, referidou);
    console.log("update referidos with status", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching referidos by status:", error);
    throw error;
  }
};
