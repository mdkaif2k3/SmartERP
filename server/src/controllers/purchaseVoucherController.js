import { createPurchaseVoucher, getPurchaseVouchers } from "../services/purchaseVoucherService.js";

export const createPurchaseVoucherController = async (req, res) => {
    try {
        const { supplierId, itemId, qty, rate } = req.body;
        if (!supplierId || !itemId || qty === undefined || rate === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (qty <= 0 || rate <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity and Rate must be greater than zero.",
            });
        }
        const amount = Number(qty) * Number(rate);
        const purchaseVoucher = await createPurchaseVoucher(
            req.company.id,
            {
                supplierId,
                itemId,
                qty: Number(qty),
                rate: Number(rate),
                amount,
            }
        );
        return res.status(201).json({
            success: true,
            message: "Purchase Voucher created successfully.",
            data: purchaseVoucher,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getPurchaseVouchersController = async (req, res) => {
    try {
        const vouchers = await getPurchaseVouchers(
            req.company.id
        );
        return res.status(200).json({
            success: true,
            data: vouchers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};