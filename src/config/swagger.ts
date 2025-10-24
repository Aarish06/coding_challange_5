import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export { swaggerUi, swaggerSpec };