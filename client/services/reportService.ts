import api from "./api";

export const getReport = async (type: "purchase" | "sales" | "inventory") => {
    const response = await api.get(`/reports?type=${type}`);
    return response.data;
};