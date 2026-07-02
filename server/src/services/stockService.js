import prisma from "../config/prisma.js";

export const createStockItem = async (companyId, stockData) => {
    return await prisma.stockItem.create({
        data: {
            name: stockData.name,
            sku: stockData.sku,
            purchasePrice: stockData.purchasePrice,
            salePrice: stockData.salePrice,
            gstPercentage: stockData.gstPercentage,
            quantity: stockData.quantity ?? 0,
            companyId,
            unitId: stockData.unitId,
        },
        include: {
            unit: true,
        },
    });
};

export const getStockItems = async (companyId) => {
    return await prisma.stockItem.findMany({
        where: {
            companyId,
        },
        include: {
            unit: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const updateStockItem = async (
    stockItemId,
    companyId,
    stockData
) => {
    const stockItem = await prisma.stockItem.findFirst({
        where: {
            id: stockItemId,
            companyId,
        },
    });

    if (!stockItem) {
        return null;
    }

    return await prisma.stockItem.update({
        where: {
            id: stockItemId,
        },
        data: {
            name: stockData.name,
            sku: stockData.sku,
            purchasePrice: stockData.purchasePrice,
            salePrice: stockData.salePrice,
            gstPercentage: stockData.gstPercentage,
            quantity: stockData.quantity,
            unitId: stockData.unitId,
        },
        include: {
            unit: true,
        },
    });
};

export const deleteStockItem = async (
    stockItemId,
    companyId
) => {
    const stockItem = await prisma.stockItem.findFirst({
        where: {
            id: stockItemId,
            companyId,
        },
    });
    if (!stockItem) {
        return false;
    }
    await prisma.stockItem.delete({
        where: {
            id: stockItemId,
        },
    });
    return true;
};