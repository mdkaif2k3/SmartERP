import prisma from "../config/prisma.js";
import { createDefaultGroups, createDefaultUnits } from "../services/companyDefaults.js";

export const createCompany = async (req, res) => {
    try {
        const { name, gstNo, address, financialYear, state } = req.body;

        if (!name || !financialYear) {
            return res.status(400).json({
                success: false,
                message: "Company name and financial year are required."
            });
        }

        const companyCount = await prisma.company.count({
            where: {
                userId: req.user.id
            }
        });

        if (companyCount >= 5) {
            return res.status(400).json({
                success: false,
                message: "Maximum of 5 companies allowed."
            });
        }

        const company = await prisma.company.create({
            data: {
                name,
                gstNo,
                address,
                financialYear,
                state,
                userId: req.user.id
            }
        });

        await createDefaultGroups(company.id);

        await createDefaultUnits(company.id);

        return res.status(201).json({
            success: true,
            message: "Company created successfully.",
            data: company
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

export const getCompanies = async (req, res) => {
    try {
        const companies = await prisma.company.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        return res.status(200).json({
            success: true,
            data: companies
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const updateCompany = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, gstNo, address, financialYear, state } = req.body;
        const existingCompany = await prisma.company.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!existingCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found."
            });
        }

        const updatedCompany = await prisma.company.update({
            where: {
                id
            },
            data: {
                name,
                gstNo,
                address,
                financialYear,
                state
            }
        });

        return res.status(200).json({
            success: true,
            message: "Company updated successfully.",
            data: updatedCompany
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found."
            });
        }

        await prisma.$transaction([
            prisma.group.deleteMany({
                where: {
                    companyId: id
                }
            }),

            prisma.unit.deleteMany({
                where: {
                    companyId: id
                }
            }),

            prisma.company.delete({
                where: {
                    id
                }
            })
        ]);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};