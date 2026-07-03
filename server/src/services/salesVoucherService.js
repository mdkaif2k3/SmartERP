import prisma from "../config/prisma.js";

export const createSalesVoucher = async (companyId, salesData) => {
    return await prisma.$transaction(async (tx) => {
        const stockItem = await tx.stockItem.findUnique({
            where: {
                id: salesData.itemId,
            },
        });
        if (!stockItem) {
            throw new Error("Stock Item not found.");
        }
        if (Number(stockItem.quantity) < Number(salesData.qty)) {
            throw new Error("Insufficient stock.");
        }
        const salesVoucher = await tx.salesVoucher.create({
            data: {
                voucherNo: salesData.voucherNo,
                totalAmount: salesData.amount,
                customerId: salesData.customerId,
                companyId,
            },
        });
        const salesItem = await tx.salesItem.create({
            data: {
                qty: salesData.qty,
                rate: salesData.rate,
                amount: salesData.amount,
                salesId: salesVoucher.id,
                itemId: salesData.itemId,
            },
        });
        await tx.stockItem.update({
            where: {
                id: salesData.itemId,
            },
            data: {
                quantity: {
                    decrement: salesData.qty,
                },
            },
        });
        return {
            ...salesVoucher,
            items: [salesItem],
        };
    });
};

export const getSalesVouchers = async (companyId) => {
    return await prisma.salesVoucher.findMany({
        where: {
            companyId,
        },
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};