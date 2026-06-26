import prisma from "../config/prisma.js";

export const createDefaultGroups = async (companyId) => {

    const groups = [
        { name: "Assets", type: "Asset", companyId },
        { name: "Liabilities", type: "Liability", companyId },
        { name: "Income", type: "Income", companyId },
        { name: "Expenses", type: "Expense", companyId }
    ];

    await prisma.group.createMany({
        data: groups
    });
};

export const createDefaultUnits = async (companyId) => {

    const units = [
        { name: "Pieces", symbol: "PCS", companyId },
        { name: "Kilogram", symbol: "KG", companyId },
        { name: "Box", symbol: "BOX", companyId },
        { name: "Liter", symbol: "LTR", companyId }
    ];

    await prisma.unit.createMany({
        data: units
    });
};