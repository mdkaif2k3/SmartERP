import prisma from "../config/prisma.js";
import { generateVoucherNumber } from "../utils/voucherGenerator.js";

export const createPurchaseVoucher = async (companyId, purchaseData) => {
    return await prisma.$transaction(async (tx) => {
        const voucherNo = await generateVoucherNumber(tx, "purchaseVoucher", "PV");
        const purchaseVoucher = await tx.purchaseVoucher.create({
            data: {
                voucherNo: voucherNo,
                totalAmount: purchaseData.amount,
                supplierId: purchaseData.supplierId,
                companyId,
            },
        });
        const purchaseItem = await tx.purchaseItem.create({
            data: {
                qty: purchaseData.qty,
                rate: purchaseData.rate,
                amount: purchaseData.amount,
                purchaseId: purchaseVoucher.id,
                itemId: purchaseData.itemId,
            },
        });
        await tx.stockItem.update({
            where: {
                id: purchaseData.itemId,
            },
            data: {
                quantity: {
                    increment: purchaseData.qty,
                },
            },
        });

        return {
            ...purchaseVoucher,
            items: [purchaseItem],
        };
    });
};

export const getPurchaseVouchers = async (companyId) => {
    return await prisma.purchaseVoucher.findMany({
        where: {
            companyId,
        },
        include: {
            supplier: true,
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