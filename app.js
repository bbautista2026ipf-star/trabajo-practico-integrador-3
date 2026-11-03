import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./src/config/database.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => console.log("Servidor corriendo en el puerto: ", PORT));
