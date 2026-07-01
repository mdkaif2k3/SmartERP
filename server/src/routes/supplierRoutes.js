import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { createSupplierController, getSuppliersController, updateSupplierController, deleteSupplierController } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", authMiddleware, companyMiddleware, createSupplierController);
router.get("/", authMiddleware, companyMiddleware, getSuppliersController);
router.put("/:id", authMiddleware, companyMiddleware, updateSupplierController);
router.delete("/:id", authMiddleware, companyMiddleware, deleteSupplierController);

export default router;