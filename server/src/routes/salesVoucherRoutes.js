import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { createSalesVoucherController, getSalesVouchersController } from "../controllers/salesVoucherController.js";

const router = express.Router();

router.post("/", authMiddleware, companyMiddleware, createSalesVoucherController);
router.get("/", authMiddleware, companyMiddleware, getSalesVouchersController);

export default router;