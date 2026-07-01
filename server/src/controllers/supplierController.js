import { createSupplier, getSuppliers, updateSupplier, deleteSupplier } from "../services/supplierService.js";

export const createSupplierController = async (req, res) => {
    try {
        const { name, mobile, address } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Supplier name is required.",
            });
        }
        const supplier = await createSupplier(
            req.company.id,
            {
                name,
                mobile,
                address,
            }
        );
        return res.status(201).json({
            success: true,
            message: "Supplier created successfully.",
            data: supplier,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getSuppliersController = async (req, res) => {
    try {
        const suppliers = await getSuppliers(req.company.id);
        return res.status(200).json({
            success: true,
            data: suppliers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateSupplierController = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await updateSupplier(
            id,
            req.company.id,
            req.body
        );
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Supplier updated successfully.",
            data: supplier,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteSupplierController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteSupplier(
            id,
            req.company.id
        );
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Supplier deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};