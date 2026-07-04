import api from "./api";

export interface LoginData {
    email: string;
    password: string;
}

export const login = async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const register = async (userData: { name: string; email: string; password: string; }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};