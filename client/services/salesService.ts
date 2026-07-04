import api from "./api";

export const getSalesVouchers = async () => {
    const response = await api.get("/sales");
    return response.data;
};

export const createSalesVoucher = async (salesData: {
    customerId: string;
    itemId: string;
    qty: number;
    rate: number;
}) => {
    const response = await api.post("/sales", salesData);
    return response.data;
};