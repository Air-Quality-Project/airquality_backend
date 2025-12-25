import { v4 as uuidv4 } from "uuid";
import { Device } from "../models/device.model.js";

export const registerDevice = async ({ device_id, firmware, ip, mac }) => {
  let device = await Device.findOne({ device_id });

  if (!device) {
    device = new Device({
      device_id,
      firmware,
      ip,
      mac,
      token: uuidv4()
    });
  } else {
    device.firmware = firmware;
    device.ip = ip;
    device.last_seen = new Date();
  }

  await device.save();

  return {
    token: device.token,
    config: device.config
  };
};

export const getDeviceByToken = async (token) => {
  return await Device.findOne({ token });
};
