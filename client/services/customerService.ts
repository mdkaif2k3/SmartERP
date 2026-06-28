import api from "./api";

export const getCustomers = async () => {
    const response = await api.get("/customer");
    return response.data;
};

export const createCustomer = async (customerData: {
    name: string;
    mobile?: string;
    address?: string;
}) => {
    const response = await api.post("/customer", customerData);
    return response.data;
};

export const updateCustomer = async (
    id: string,
    customerData: {
        name: string;
        mobile?: string;
        address?: string;
    }
) => {
    const response = await api.put(`/customer/${id}`, customerData);
    return response.data;
};

export const deleteCustomer = async (id: string) => {
    const response = await api.delete(`/customer/${id}`);
    return response.data;
};