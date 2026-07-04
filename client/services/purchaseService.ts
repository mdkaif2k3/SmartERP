import api from "./api";

export const getPurchaseVouchers = async () => {
    const response = await api.get("/purchase");
    return response.data;
};

export const createPurchaseVoucher = async (purchaseData: {
    supplierId: string;
    itemId: string;
    qty: number;
    rate: number;
}) => {
    const response = await api.post("/purchase", purchaseData);
    return response.data;
};