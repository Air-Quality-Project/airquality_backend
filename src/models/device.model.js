import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
      unique: true,
    },

    mac: {
      type: String,
    },

    token: {
      type: String,
      required: true,
    },

    // 🔥 CURRENT firmware running on device (source of truth)
    firmware: {
      type: String,
      default: "1.0.0",
    },

    ip: {
      type: String,
    },

    // 🔧 DEVICE CONFIG (sent to ESP32)
    config: {
      report_interval: {
        type: Number,
        default: 30,
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },

      // ✅ OTA MASTER SWITCH
      ota_enabled: {
        type: Boolean,
        default: true,
      },

      // ✅ OTA PAYLOAD
      ota: {
        version: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },

    last_seen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Device = mongoose.model("Device", DeviceSchema);
