import api from "./api";

export const getCompanies = async () => {
    const response = await api.get("/company");
    return response.data;
};

export const createCompany = async (companyData: {
    name: string;
    financialYear: string;
    state: string;
    gstNumber: string;
    address: string;
}) => {
    const response = await api.post("/company", companyData);
    return response.data;
};