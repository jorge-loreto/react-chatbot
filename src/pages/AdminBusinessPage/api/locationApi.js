import apiCliente from "./apiCliente";

/**
 * CREATE location
 * - If id is provided → location is linked to business
 * - If id is null → standalone location
 */
export const createLocation = async (locationData, businessId = null) => {
    try {
        const url = businessId
            ? `/locations/locations/${businessId}`
            : `/locations/locations`;

        const response = await apiCliente.post(url, locationData);
        return response.data;
    } catch (error) {
        console.error("Error creating location:", error);
        throw error;
    }
};

/**
 * GET locations by business
 */
export const getLocationsByBusiness = async (businessId) => {
    try {
        const response = await apiCliente.get(`/locations/business/${businessId}`);
        return response.data;
    } catch (error) {
        console.error("Error loading business locations:", error);
        throw error;
    }
};

/**
 * GET locations without business
 */
export const getUnassignedLocations = async () => {
    try {
        const response = await apiCliente.get(`/locations/unassigned`);
        return response.data;
    } catch (error) {
        console.error("Error loading unassigned locations:", error);
        throw error;
    }
};

/**
 * ASSIGN existing location to business
 */
export const assignLocationToBusiness = async (locationId, businessId) => {
    try {
        const response = await apiCliente.put(
            `/locations/${locationId}/assign/${businessId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error assigning location:", error);
        throw error;
    }
};

/**
 * UNASSIGN location from business
 */
export const unassignLocationFromBusiness = async (locationId, businessId) => {
    try {
        console.log("Unassigning location:", locationId, "from business:", businessId);
        const response = await apiCliente.put(
            `/locations/${locationId}/unassign/${businessId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error unassigning location:", error);
        throw error;
    }
};

export const updateLocation = async (locationId, locationData) => {
    try {
        const response = await apiCliente.put(`/locations/${locationId}`, locationData);
        return response.data;
    } catch (error) {
        console.error("Error updating location:", error);
        throw error;
    }
};
