import express from "express";
import { GETpair } from "../controller/factoryController";

const router = express.Router();

router.get("/", GETpair);

export default router;
