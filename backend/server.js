import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";

import connectDb from "./config/DbConfig.js";
import errorHandler from "./middlewares/error.middleware.js";

// routes
import authRoutes from "./routes/auth.routes.js"
import chargerRoutes from "./routes/charger.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

connectDb();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth",authRoutes)
app.use("/api/chargers",chargerRoutes)

app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})


