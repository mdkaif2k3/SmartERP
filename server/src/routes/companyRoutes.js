import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import companyMiddleware from "../middleware/companyMiddleware.js";
import { createCompany, getCompanies, updateCompany, deleteCompany } from "../controllers/companyController.js";

const router = express.Router();

router.post("/", authMiddleware, createCompany);
router.get("/", authMiddleware, getCompanies);
router.put("/:id", authMiddleware, updateCompany);
router.delete("/:id", authMiddleware, deleteCompany);

router.get("/active", authMiddleware, companyMiddleware,
    (req, res) => {
        res.status(200).json({
            success: true,
            data: req.company
        });
    }
);

export default router;