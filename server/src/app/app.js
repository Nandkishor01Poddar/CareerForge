import express from "express";
import requestIdMiddleware
    from "../middleware/requestId.middleware.js";
import authRoutes
    from "../modules/auth/auth.routes.js";
import errorHandler
    from "../core/errors/errorHandler.js";

const app = express();

app.use(express.json());
app.use(requestIdMiddleware);

// Routes
app.use("/api/v1/auth", authRoutes);

// after all routes
// 404 handler would go here
app.use(notFoundMiddleware);


// MUST be last
app.use(errorHandler);

export default app;