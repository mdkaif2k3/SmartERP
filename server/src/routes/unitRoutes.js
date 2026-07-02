import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { getUnitsController } from "../controllers/unitController.js";

const router = express.Router();

router.get("/", authMiddleware, companyMiddleware, getUnitsController);

export default router;