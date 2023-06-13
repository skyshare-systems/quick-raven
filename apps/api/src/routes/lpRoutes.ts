import express from "express";
import {
  GETallowance,
  GETbalanceOf,
  GETtotalSupply,
  GETreserves,
} from "../controller/lpController";

const router = express.Router();

router.post("/allowance", GETallowance);
router.post("/balanceOf", GETbalanceOf);
router.post("/totalSupply", GETtotalSupply);
router.post("/reserves", GETreserves);

export default router;
