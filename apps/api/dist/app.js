"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ROUTE IMPORTS
const tokenRoutes_1 = __importDefault(require("./src/routes/tokenRoutes"));
const lpRoutes_1 = __importDefault(require("./src/routes/lpRoutes"));
const factoryRoutes_1 = __importDefault(require("./src/routes/factoryRoutes"));
// CONFIG
const port = 3000;
const app = (0, express_1.default)();
// MIDDLEWARE
// Routers
app.use("api/token", tokenRoutes_1.default);
app.use("api/lp", lpRoutes_1.default);
app.use("api/factory", factoryRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});