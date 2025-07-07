import express from "express";
import { getAllCoins, getOneCoin } from "../controllers/coinscope.controller.js";

const router = express.Router();

router.get("/getAllCoins", getAllCoins);
router.get("/getOneCoin", getOneCoin);

export default router;