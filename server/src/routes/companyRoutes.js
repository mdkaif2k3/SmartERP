import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createCompany, getCompanies, updateCompany, deleteCompany } from "../controllers/companyController.js";

const router = express.Router();

router.post("/", authMiddleware, createCompany);
router.get("/", authMiddleware, getCompanies);
router.put("/:id", authMiddleware, updateCompany);
router.delete("/:id", authMiddleware, deleteCompany);

export default router;