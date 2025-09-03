const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// Memory optimization settings
const server = express();

// Reduce memory usage by limiting request size
server.use(express.json({ limit: "1mb" }));
server.use(express.urlencoded({ limit: "1mb", extended: true }));

// Serve static files with caching
server.use(
  "/_next/static",
  express.static(path.join(__dirname, ".next/static"), {
    maxAge: "1y",
    immutable: true,
  })
);

// Handle all other routes with Next.js
server.all("*", (req, res) => {
  return handle(req, res);
});

app
  .prepare()
  .then(() => {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);

      // Log initial memory usage
      const memUsage = process.memoryUsage();
      console.log(
        `> Initial Memory usage: ${Math.round(
          memUsage.heapUsed / 1024 / 1024
        )}MB`
      );

      // Start memory monitoring
      require("./memory-monitor");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
