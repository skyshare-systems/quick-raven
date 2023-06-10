import express, { Express, Request, Response } from "express";
import cors from "cors";

// ROUTE IMPORTS
import tokenRoutes from "./src/routes/tokenRoutes";
import lpRoutes from "./src/routes/lpRoutes";
import factoryRoutes from "./src/routes/factoryRoutes";

// CONFIG
const port = 3000;
const app: Express = express();

// MIDDLEWARE

// Routers
app.use("/api/token", tokenRoutes);
app.use("/api/lp", lpRoutes);
app.use("/api/factory", factoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
