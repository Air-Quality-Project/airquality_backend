import express from "express";
import { register, getConfig } from "../controllers/device.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateFirmware } from "../controllers/device.controller.js";


const router = express.Router();

router.post("/register", register);
router.get("/config", authMiddleware, getConfig);
router.post("/firmware", authMiddleware, updateFirmware);

export default router;
