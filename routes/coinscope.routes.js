import express from "express";
import {
  fetchAllCoins,
  fetchCoinById,
  fetchHourlyHistory,
  fetch7dHistory,
  fetch30dHistory,
  fetch1yHistory
} from "../controllers/coinscope.controller.js";

const router = express.Router();

router.get("/all", fetchAllCoins);
router.get("/:id", fetchCoinById);
router.get("/:id/history/hourly", fetchHourlyHistory);
router.get("/:id/history/7d", fetch7dHistory);
router.get("/:id/history/30d", fetch30dHistory);
router.get("/:id/history/1y", fetch1yHistory);

export default router;