import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import deviceRoutes from "./routes/device.routes.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"




const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(
  "/firmware",
  express.static(path.join(process.cwd(), "firmware"))
);

app.get("/", (req, res) => {
  res.send("ESP32 Backend is running");
});

app.use("/api/device", deviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


export default app;
