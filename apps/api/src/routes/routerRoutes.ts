import express from "express";
import { GETamountIn, GETamountOut } from "../controller/routerController";

const router = express.Router();

router.get("/amountIn", GETamountIn);
router.get("/amountOut", GETamountOut);

export default router;
