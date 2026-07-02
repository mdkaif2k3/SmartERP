import prisma from "../config/prisma.js";

export const getUnits = async (companyId) => {
    return await prisma.unit.findMany({
        where: {
            companyId,
        },
        orderBy: {
            name: "asc",
        },
    });
};