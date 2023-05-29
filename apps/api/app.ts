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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
