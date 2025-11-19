import express from "express";
import healthCheckRoute from "./routes/health.routes.js";
import linkRoute from "./routes/link.route.js";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Load Swagger file
const swaggerDocument = YAML.load("./swagger.yaml");
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/", healthCheckRoute);
app.use("/api/links", linkRoute);

export { app };
