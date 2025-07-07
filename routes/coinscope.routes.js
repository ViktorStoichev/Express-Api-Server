import express from "express";
import { getAllCoins, getHistoryFor7Days, getOneCoin } from "../controllers/coinscope.controller.js";

const router = express.Router();

router.get("/getAllCoins", getAllCoins);
router.get("/getOneCoin/:id", getOneCoin);
router.get("/getOneCoin/:id/market_chart", getHistoryFor7Days);

export default router;