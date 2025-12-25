import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import deviceRoutes from "./routes/device.routes.js";
import path from "path";



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

export default app;
