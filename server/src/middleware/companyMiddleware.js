import prisma from "../config/prisma.js";

const companyMiddleware = async (req, res, next) => {
    try {
        const companyId = req.header("X-Company-Id");
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID header is missing."
            });
        }
        const company = await prisma.company.findFirst({
            where: {
                id: companyId,
                userId: req.user.id
            }
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found or access denied."
            });
        }

        req.company = company;

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default companyMiddleware;