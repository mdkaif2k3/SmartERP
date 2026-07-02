import { getUnits } from "../services/unitService.js";

export const getUnitsController = async (req, res) => {
    try {
        const units = await getUnits(req.company.id);
        return res.status(200).json({
            success: true,
            data: units,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};