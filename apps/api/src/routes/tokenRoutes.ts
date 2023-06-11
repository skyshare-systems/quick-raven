import express from "express";
import {
  GETallowance,
  GETbalanceOf,
  GETtotalSupply,
  GETname,
  GETtest,
} from "../controller/tokenController";

const router = express.Router();

router.get("/allowance", GETallowance);
router.get("/balanceOf", GETbalanceOf);
router.get("/totalSupply", GETtotalSupply);
router.get("/name", GETname);
router.get("/test", GETtest);

export default router;
