import { getDashboardData } from "../services/dashboardService.js";

export const getDashboardController = async (req, res) => {
    try {
        const dashboard = await getDashboardData(
            req.company.id
        );
        return res.status(200).json({
            success: true,
            data: dashboard,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};