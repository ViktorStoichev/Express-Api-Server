import express from "express";
import { getAllCoins, getOneCoin, getPricesHistory } from "../controllers/coinscope.controller.js";

const router = express.Router();

router.get("/getAllCoins", getAllCoins);
router.get("/getOneCoin/:id", getOneCoin);
router.get("/getOneCoin/:id/market_chart", getPricesHistory);

export default router;