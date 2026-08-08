import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiApp from "./api/index.js";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Mount the API
app.use(apiApp);

async function startServer() {
  if (process.env.VERCEL) return;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BiO Station server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

