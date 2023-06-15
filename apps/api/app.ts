import express, { Express, Request, Response } from "express";
import cors from "cors";

// ROUTE IMPORTS
import tokenRoutes from "./src/routes/tokenRoutes";
import lpRoutes from "./src/routes/lpRoutes";
import factoryRoutes from "./src/routes/factoryRoutes";
import routerRoutes from "./src/routes/routerRoutes";

// CONFIG
const port = 9001;
const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routers
app.use("/api/token", tokenRoutes);
app.use("/api/lp", lpRoutes);
app.use("/api/factory", factoryRoutes);
app.use("/api/router", routerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
