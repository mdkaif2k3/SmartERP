import prisma from "../config/prisma.js";

export const getDashboardData = async (companyId) => {
    const [ customerCount, supplierCount, stockItemCount, purchaseCount, salesCount, purchaseTotal, salesTotal, stockItems ] = await Promise.all([
        prisma.customer.count({
            where: {
                companyId,
            },
        }),

        prisma.supplier.count({
            where: {
                companyId,
            },
        }),

        prisma.stockItem.count({
            where: {
                companyId,
            },
        }),

        prisma.purchaseVoucher.count({
            where: {
                companyId,
            },
        }),

        prisma.salesVoucher.count({
            where: {
                companyId,
            },
        }),

        prisma.purchaseVoucher.aggregate({
            where: {
                companyId,
            },
            _sum: {
                totalAmount: true,
            },
        }),

        prisma.salesVoucher.aggregate({
            where: {
                companyId,
            },
            _sum: {
                totalAmount: true,
            },
        }),

        prisma.stockItem.findMany({
            where: {
                companyId,
            },
            select: {
                name: true,
                quantity: true,
                purchasePrice: true,
            },
        }),
    ]);

    let inventoryValue = 0;
    const lowStock = [];
    for (const item of stockItems) {
        inventoryValue +=
            Number(item.quantity) *
            Number(item.purchasePrice);

        if (Number(item.quantity) <= 5) {
            lowStock.push({
                name: item.name,
                quantity: Number(item.quantity),
            });
        }
    }

    return {
        customerCount,
        supplierCount,
        stockItemCount,
        purchaseCount,
        salesCount,
        purchaseTotal:
            Number(purchaseTotal._sum.totalAmount ?? 0),
        salesTotal:
            Number(salesTotal._sum.totalAmount ?? 0),
        inventoryValue,
        lowStock,
    };
};