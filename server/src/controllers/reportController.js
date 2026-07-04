import { getReportData } from "../services/reportService.js";

export const getReportController = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Report type is required.",
            });

        }
        const data = await getReportData(req.company.id, type);
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:
                error.message === "Invalid report type"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};