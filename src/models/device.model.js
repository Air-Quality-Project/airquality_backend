import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema(
  {
    // 🔹 Device identity
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

    // 🔹 Firmware state (reported by device)
    firmware: {
      type: String,
      default: "1.0.0",
    },

    ip: {
      type: String,
    },

    // 🔐 OWNERSHIP (THIS IS THE KEY FIX)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // 🔗 PAIRING (TEMPORARY, FOR CLAIMING)
    pairing: {
      code: {
        type: String,
      },
      expires_at: {
        type: Date,
      },
      claimed: {
        type: Boolean,
        default: false,
      },
    },

    // ⚙️ DEVICE CONFIG (sent to ESP32)
    config: {
      report_interval: {
        type: Number,
        default: 30,
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },

      ota_enabled: {
        type: Boolean,
        default: true,
      },

      ota: {
        version: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },

    // 🫀 Heartbeat
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
