import prisma from "../config/prisma.js";

export const createCustomer = async (companyId, customerData) => {

    const customer = await prisma.customer.create({
        data: {
            name: customerData.name,
            mobile: customerData.mobile,
            address: customerData.address,
            companyId: companyId
        }
    });

    return customer;

};

export const getCustomers = async (companyId) => {
    return await prisma.customer.findMany({
        where: {
            companyId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const updateCustomer = async (customerId, companyId, customerData) => {
    const customer = await prisma.customer.findFirst({
        where: {
            id: customerId,
            companyId
        }
    });

    if (!customer) {
        return null;
    }

    return await prisma.customer.update({
        where: {
            id: customerId
        },
        data: {
            name: customerData.name,
            mobile: customerData.mobile,
            address: customerData.address
        }
    });
};

export const deleteCustomer = async (customerId, companyId) => {

    const customer = await prisma.customer.findFirst({
        where: {
            id: customerId,
            companyId
        }
    });

    if (!customer) {
        return false;
    }

    await prisma.customer.delete({
        where: {
            id: customerId
        }
    });
    return true;
};