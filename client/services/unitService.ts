import api from "./api";

export const getUnits = async () => {
    const response = await api.get("/unit");
    return response.data;
};