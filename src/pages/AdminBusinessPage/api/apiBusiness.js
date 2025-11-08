// src/api/referidosApi.js
import apiCliente from "./apiCliente";

export const getBusiness = async () => {
  try {
    const response = await apiCliente.get(`/business/all`);
    console.log(`Fetched referidos with status ${status}:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching referidos by status:", error);
    throw error;
  }
};
