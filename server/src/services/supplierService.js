import prisma from "../config/prisma.js";

export const createSupplier = async (companyId, supplierData) => {
    const supplier = await prisma.supplier.create({
        data: {
            name: supplierData.name,
            mobile: supplierData.mobile,
            address: supplierData.address,
            companyId,
        },
    });
    return supplier;
};

export const getSuppliers = async (companyId) => {
    return await prisma.supplier.findMany({
        where: {
            companyId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const updateSupplier = async (
    supplierId,
    companyId,
    supplierData
) => {

    const supplier = await prisma.supplier.findFirst({
        where: {
            id: supplierId,
            companyId,
        },
    });

    if (!supplier) {
        return null;
    }

    return await prisma.supplier.update({
        where: {
            id: supplierId,
        },
        data: {
            name: supplierData.name,
            mobile: supplierData.mobile,
            address: supplierData.address,
        },
    });

};

export const deleteSupplier = async (
    supplierId,
    companyId
) => {

    const supplier = await prisma.supplier.findFirst({
        where: {
            id: supplierId,
            companyId,
        },
    });

    if (!supplier) {
        return false;
    }

    await prisma.supplier.delete({
        where: {
            id: supplierId,
        },
    });
    return true;
};