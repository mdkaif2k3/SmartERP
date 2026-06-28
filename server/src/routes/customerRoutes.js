import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";

import { createCustomerController, getCustomersController, updateCustomerController, deleteCustomerController } from "../controllers/customerController.js";

const router = express.Router();

router.post("/", authMiddleware, companyMiddleware, createCustomerController);
router.get("/", authMiddleware, companyMiddleware, getCustomersController);
router.put("/:id", authMiddleware, companyMiddleware, updateCustomerController);
router.delete("/:id", authMiddleware, companyMiddleware, deleteCustomerController);

export default router;