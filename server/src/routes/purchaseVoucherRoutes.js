import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { createPurchaseVoucherController, getPurchaseVouchersController } from "../controllers/purchaseVoucherController.js";

const router = express.Router();

router.post("/", authMiddleware, companyMiddleware, createPurchaseVoucherController);
router.get("/", authMiddleware, companyMiddleware, getPurchaseVouchersController);

export default router;