import api from "./api";

export const getStockItems = async () => {
    const response = await api.get("/stock");
    return response.data;
};

export const createStockItem = async (stockData: {
    name: string;
    sku: string;
    purchasePrice: number;
    salePrice: number;
    gstPercentage: number;
    quantity: number;
    unitId: string;
}) => {
    const response = await api.post("/stock", stockData);
    return response.data;
};

export const updateStockItem = async (
    id: string,
    stockData: {
        name: string;
        sku: string;
        purchasePrice: number;
        salePrice: number;
        gstPercentage: number;
        quantity: number;
        unitId: string;
    }
) => {
    const response = await api.put(`/stock/${id}`, stockData);
    return response.data;
};

export const deleteStockItem = async (id: string) => {
    const response = await api.delete(`/stock/${id}`);
    return response.data;
};