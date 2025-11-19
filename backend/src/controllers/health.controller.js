import { ApiError, ApiResponse } from "../utils/apiResponse.js";

const healthCheck = async (req, res) => {
    try {
        let dbStatus = "unknown";
        if (global.mongooseConnection) {
            const state = ["disconnected", "connected", "connecting", "disconnecting"];
            dbStatus = state[global.mongooseConnection.readyState] || "unknown";
        }

        return res.status(200).json(new ApiResponse(200, { status: "ok", version: "1.0", uptime: process.uptime, databaseStatus: dbStatus, timestamp: new Date() }, "System Is Up and Runing"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Health check failed"));
    }
};

export { healthCheck };
