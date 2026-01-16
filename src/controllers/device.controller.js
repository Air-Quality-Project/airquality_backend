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

export const generatePairingCode = async (req, res) => {
  const device = req.device;

  if (device.owner) {
    return res.status(400).json({
      message: "Device already claimed",
    });
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  device.pairing = {
    code,
    expires_at: expires,
    claimed: false,
  };

  await device.save();

  res.json({
    pairing_code: code,
    expires_in: 300,
  });
};

export const claimDevice = async (req, res) => {
  const { pairing_code } = req.body;

  if (!pairing_code) {
    return res.status(400).json({ message: "Pairing code required" });
  }

  const device = await Device.findOne({
    "pairing.code": pairing_code,
    "pairing.expires_at": { $gt: new Date() },
    "pairing.claimed": false,
  });

  if (!device) {
    return res.status(400).json({
      message: "Invalid or expired pairing code",
    });
  }

  device.owner = req.user._id;
  device.pairing.claimed = true;
  device.pairing = null;

  await device.save();

  res.json({
    success: true,
    device_id: device.device_id,
  });
};