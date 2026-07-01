import api from "./api";

export const getSuppliers = async () => {
    const response = await api.get("/supplier");
    return response.data;
};

export const createSupplier = async (supplierData: {
    name: string;
    mobile?: string;
    address?: string;
}) => {
    const response = await api.post("/supplier", supplierData);
    return response.data;
};

export const updateSupplier = async (
    id: string,
    supplierData: {
        name: string;
        mobile?: string;
        address?: string;
    }
) => {
    const response = await api.put(`/supplier/${id}`, supplierData);
    return response.data;
};

export const deleteSupplier = async (id: string) => {
    const response = await api.delete(`/supplier/${id}`);
    return response.data;
};