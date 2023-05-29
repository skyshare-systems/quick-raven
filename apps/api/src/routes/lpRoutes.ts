import express from "express";
import {
  GETallowance,
  GETbalanceOf,
  GETtotalSupply,
  GETreserves,
} from "../controller/lpController";

const router = express.Router();

router.get("/allowance", GETallowance);
router.get("/balanceOf", GETbalanceOf);
router.get("/totalSupply", GETtotalSupply);
router.get("/reserves", GETreserves);

export default router;
