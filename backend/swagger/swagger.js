import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "EV Charging Station API",
            version: "1.0.0",
            description: "REST API documentation for EV Charging Station Management System"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Server"
            },
            {
                url: "https://evoltsoftassignment.onrender.com/api",
                description: "Production Server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;