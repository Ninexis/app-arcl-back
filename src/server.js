import express from "express";
import cors from "cors";
import router from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGINS || "*" }));
app.use(express.json());
app.use("/cookieclicker", router);

// Serve le fichier swagger brut (optionnel)
app.get("/openapi.yaml", (_, res) => {
  res.sendFile(process.cwd() + "/openapi.yaml");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// error handler
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Erreur serveur" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API démarrée sur :${PORT}`));
