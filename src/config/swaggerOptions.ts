export const swaggerOptions = {
definition: {
openapi: "3.0.3",
info: { title: "Content Moderation API - v1", version: "1.0.0" },
servers: [{ url: "http://localhost:3000/api/v1" }],
components: {
securitySchemes: {
bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
},
schemas: {
// Post, UserProfile, FlaggedStats, ModerateResult, FlagUserResult, ErrorResponse
}
},
security: [{ bearerAuth: [] }]
},
apis: ["./src/api/v1/routes/*.ts"]
};