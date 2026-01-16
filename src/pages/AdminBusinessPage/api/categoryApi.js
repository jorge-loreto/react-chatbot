import apiCliente from "../../AdminPage/api/apiCliente";

export const getCategoriesByIds = async (categoryIds) => {
    if (!categoryIds || categoryIds.length === 0) {
        return [];
    }

    const response = await apiCliente.post(
        "/categories/by-ids",
        categoryIds
    );

    return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
    const response = await apiCliente.put(
        `/categories/${categoryId}`,
        categoryData
    );

    return response.data;
};


export const getCourseDetails = async (locationId, categoryId) => {
    const response = await apiCliente.get(
        `/categories/details/${locationId}/${categoryId}`
    );
    return response.data;
};

export const updateCourseDetails = async (locationId, categoryId, detailsData) => {
    const response = await apiCliente.put(
        `/categories/details/${locationId}/${categoryId}`,
        detailsData
    );
    return response.data;
};

export const getAllCategories = async () => {
    const response = await apiCliente.get("/categories/all");
    return response.data;
};