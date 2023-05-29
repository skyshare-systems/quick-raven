import express from "express";
import {
  GETallowance,
  GETbalanceOf,
  GETtotalSupply,
  GETname,
} from "../controller/tokenController";

const router = express.Router();

router.post("/allowance", GETallowance);
router.post("/balanceOf", GETbalanceOf);
router.post("/totalSupply", GETtotalSupply);
router.post("/name", GETname);

export default router;
