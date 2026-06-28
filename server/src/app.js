import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config()

const app = express();

app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/customer", customerRoutes);

app.get("/", (req, res) => {
  res.send("SmartERP API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});