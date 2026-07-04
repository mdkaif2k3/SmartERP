import prisma from "../config/prisma.js";

export const getReportData = async (companyId, type) => {
    switch (type) {
        case "purchase": {
            const purchases = await prisma.purchaseVoucher.findMany({
                where: {
                    companyId,
                },
                include: {
                    supplier: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            const total = purchases.reduce(
                (sum, purchase) => sum + Number(purchase.totalAmount),
                0
            );
            return {
                report: purchases,
                total,
            };
        }
        case "sales": {
            const sales = await prisma.salesVoucher.findMany({
                where: {
                    companyId,
                },
                include: {
                    customer: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            const total = sales.reduce(
                (sum, sale) => sum + Number(sale.totalAmount),
                0
            );
            return {
                report: sales,
                total,
            };
        }
        case "inventory": {
            const stock = await prisma.stockItem.findMany({
                where: {
                    companyId,
                },
                include: {
                    unit: true,
                },
                orderBy: {
                    name: "asc",
                },
            });
            const totalValue = stock.reduce(
                (sum, item) => sum + Number(item.quantity) * Number(item.purchasePrice),
                0
            );
            return {
                report: stock,
                total: totalValue,
            };
        }
        default:
            throw new Error("Invalid report type");
    }
};