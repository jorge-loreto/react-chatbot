// src/api/referidosApi.js
import apiCliente from "./apiCliente";
import Status from "../constants/statusEnum";

export const getReferidosByStatus = async (status = Status.NEW) => {
  try {
    const response = await apiCliente.get(`/referidos/status/${status}`);
    console.log(`Fetched referidos with status ${status}:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching referidos by status:", error);
    throw error;
  }
};
