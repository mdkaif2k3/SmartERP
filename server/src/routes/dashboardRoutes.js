import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { getDashboardController } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, companyMiddleware, getDashboardController);

export default router;