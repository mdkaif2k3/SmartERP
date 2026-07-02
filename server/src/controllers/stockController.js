import { createStockItem, getStockItems, updateStockItem, deleteStockItem } from "../services/stockService.js";

export const createStockItemController = async (req, res) => {
    try {
        const {
            name,
            sku,
            purchasePrice,
            salePrice,
            gstPercentage,
            quantity,
            unitId,
        } = req.body;
        if (!name || !sku || purchasePrice === undefined || salePrice === undefined || gstPercentage === undefined || !unitId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        const stockItem = await createStockItem(
            req.company.id,
            {
                name,
                sku,
                purchasePrice: Number(purchasePrice),
                salePrice: Number(salePrice),
                gstPercentage: Number(gstPercentage),
                quantity: quantity ? Number(quantity) : 0,
                unitId,
            }
        );
        return res.status(201).json({
            success: true,
            message: "Stock Item created successfully.",
            data: stockItem,
        });
    } catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "SKU already exists.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getStockItemsController = async (req, res) => {
    try {
        const stockItems = await getStockItems(req.company.id);
        return res.status(200).json({
            success: true,
            data: stockItems,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateStockItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const stockItem = await updateStockItem(
            id,
            req.company.id,
            {
                ...req.body,
                purchasePrice: Number(req.body.purchasePrice),
                salePrice: Number(req.body.salePrice),
                gstPercentage: Number(req.body.gstPercentage),
                quantity: Number(req.body.quantity),
            }
        );
        if (!stockItem) {
            return res.status(404).json({
                success: false,
                message: "Stock Item not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Stock Item updated successfully.",
            data: stockItem,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteStockItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteStockItem(
            id,
            req.company.id
        );

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Stock Item not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock Item deleted successfully.",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};