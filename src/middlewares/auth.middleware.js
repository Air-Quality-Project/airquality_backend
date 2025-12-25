import { getDeviceByToken } from "../services/device.service.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing"
    });
  }

  const token = authHeader.replace("Bearer ", "");
  const device = await getDeviceByToken(token);

  if (!device) {
    return res.status(403).json({
      success: false,
      message: "Invalid token"
    });
  }

  req.device = device;
  next();
};
