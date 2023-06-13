import express from "express";
import { GETpair } from "../controller/factoryController";

const router = express.Router();

router.post("/", GETpair);

export default router;
