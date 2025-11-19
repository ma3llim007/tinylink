import express from "express";
import healthCheckRoute from "./routes/health.routes.js";
import linkRoute from "./routes/link.route.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api/", healthCheckRoute);
app.use("/api/links", linkRoute);

export { app };
