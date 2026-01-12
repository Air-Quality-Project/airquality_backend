import { registerDevice } from "../services/device.service.js";
import { logger } from "../utils/logger.js";
import { Device } from "../models/device.model.js"; // 🔥 MISSING IMPORT

export const register = async (req, res) => {
  const { device_id, firmware, ip, mac } = req.body;

  if (!device_id || !firmware) {
    return res.status(400).json({
      success: false,
      message: "device_id and firmware are required"
    });
  }

  const result = await registerDevice({
    device_id,
    firmware,
    ip,
    mac
  });

  logger.info("Device registered:", device_id);

  res.json({
    success: true,
    token: result.token,
    config: result.config
  });
};

export const getConfig = async (req, res) => {
  res.json({
    success: true,
    config: req.device.config
  });
};

export const updateFirmware = async (req, res) => {
  try {
    const deviceId = req.device.device_id;
    const { firmware } = req.body;

    if (!firmware) {
      return res.status(400).json({ error: "Firmware version required" });
    }

    const result = await Device.updateOne(
      { device_id: deviceId },
      {
        $set: {
          firmware,
          updatedAt: new Date()
        }
      }
    );

    console.log("Firmware update result:", result);

    res.json({
      success: true,
      firmware
    });
  } catch (err) {
    console.error("Firmware update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
