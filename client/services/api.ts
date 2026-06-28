import axios from "axios";
import { getToken } from "@/utils/auth";
import { getCompanyId } from "@/utils/company";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    const companyId = getCompanyId();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (companyId) {
        config.headers["X-Company-Id"] = companyId;
    }
    return config;
});

export default api;