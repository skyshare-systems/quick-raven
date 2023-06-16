import express from "express";
import { GETamountIn, GETamountOut } from "../controller/routerController";

const router = express.Router();

router.post("/amountIn", GETamountIn);
router.post("/amountOut", GETamountOut);

export default router;
