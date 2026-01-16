import express from "express";
import { register, getConfig,claimDevice} from "../controllers/device.controller.js";
import {  authMiddleware } from "../middlewares/auth.middleware.js";
import { updateFirmware } from "../controllers/device.controller.js";
import { generatePairingCode } from "../controllers/device.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";





const router = express.Router();

router.post("/register", register);
router.get("/config", authMiddleware, getConfig);
router.post("/firmware", authMiddleware, updateFirmware);
router.get("/pair", authMiddleware, generatePairingCode);
router.post("/claim", userAuth, claimDevice);

export default router;
