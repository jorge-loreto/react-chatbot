import apiCliente from "./apiCliente";

export const createLocation = async (locationData, id) => {
    console.log("creating new location:", locationData);
    try {
        const response = await apiCliente.post(`/locations/locations/${id}`, locationData);
        console.log("Location created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error saving business:", error);
        throw error;
    }
};
// 🆕 UPDATE (EDIT) BUSINESS
export const updateBusiness = async (id, businessData) => {
    try {
        const response = await apiCliente.put(`/business/${id}`, businessData);
        console.log("Business updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating business:", error);
        throw error;
    }
};