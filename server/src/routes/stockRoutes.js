import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { createStockItemController, getStockItemsController, updateStockItemController, deleteStockItemController } from "../controllers/stockController.js";

const router = express.Router();

router.post( "/", authMiddleware, companyMiddleware, createStockItemController);
router.get("/", authMiddleware, companyMiddleware, getStockItemsController);
router.put("/:id", authMiddleware, companyMiddleware, updateStockItemController);
router.delete("/:id", authMiddleware, companyMiddleware, deleteStockItemController);

export default router;