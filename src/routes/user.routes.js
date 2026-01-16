import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { Device } from "../models/device.model.js";

const router = express.Router();

router.get("/devices", userAuth, async (req, res) => {
  const devices = await Device.find({ owner: req.user._id }).select(
    "device_id firmware last_seen config"
  );

  res.json(devices);
});

export default router;
