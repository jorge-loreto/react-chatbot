import apiCliente from "./apiCliente";

export const saveBusiness = async (businessData) => {
  try {
    const response = await apiCliente.post("/business/save", businessData);
    console.log("Business saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving business:", error);
    throw error;
  }
};
