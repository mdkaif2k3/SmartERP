import { createSalesVoucher, getSalesVouchers } from "../services/salesVoucherService.js";

export const createSalesVoucherController = async (req, res) => {
    try {
        const { voucherNo, customerId, itemId, qty, rate } = req.body;

        if (!voucherNo || !customerId || !itemId || qty === undefined || rate === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        if (Number(qty) <= 0 || Number(rate) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity and Rate must be greater than zero.",
            });
        }
        const amount = Number(qty) * Number(rate);
        const salesVoucher = await createSalesVoucher(
            req.company.id,
            {
                voucherNo,
                customerId,
                itemId,
                qty: Number(qty),
                rate: Number(rate),
                amount,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Sales Voucher created successfully.",
            data: salesVoucher,
        });

    } catch (error) {
        console.error(error);
        if (error.message === "Insufficient stock.") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Stock Item not found.") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getSalesVouchersController = async (req, res) => {
    try {
        const vouchers = await getSalesVouchers(
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