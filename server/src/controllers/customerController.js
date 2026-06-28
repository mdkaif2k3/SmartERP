import { createCustomer, getCustomers, updateCustomer, deleteCustomer } from "../services/customerService.js";

export const createCustomerController = async (req, res) => {
    try {
        const { name, mobile, address } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Customer name is required."
            });
        }
        const customer = await createCustomer(
            req.company.id,
            {
                name,
                mobile,
                address
            }
        );
        return res.status(201).json({
            success: true,
            message: "Customer created successfully.",
            data: customer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getCustomersController = async (req, res) => {
    try {
        const customers = await getCustomers(req.company.id);
        return res.status(200).json({
            success: true,
            data: customers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const updateCustomerController = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await updateCustomer(
            id,
            req.company.id,
            req.body
        );
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Customer updated successfully.",
            data: customer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deleteCustomerController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCustomer(
            id,
            req.company.id
        );
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};