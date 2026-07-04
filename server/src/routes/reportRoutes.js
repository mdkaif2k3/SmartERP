import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { getReportController } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", authMiddleware, companyMiddleware, getReportController);

export default router;