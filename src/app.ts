import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import { xss } from "express-xss-sanitizer";
import compression from "compression";
import path from "path";

// ✅ Import modular routes
import v1Routes from "./routes";

import { errorHandler, notFoundHandler } from "./middlewares/error-handler.middleware";

const { NODE_ENV, IMAGE_CDN_ORIGIN = "http://localhost:8000" } = process.env;
const app: Application = express();

// ✅ Enable middlewares
// app.use(
//     locale({
//         priority: ["accept-language", "default"],
//         default: "en_US", // ar_AE
//     })
// );
// app.use(startPolyglot);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);
app.use(cors());
app.use(compression());
app.use(hpp());
app.use(xss());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// ✅ Register modular routes
app.use("/api", v1Routes);
app.use("/uploads", express.static("uploads"));

// ✅ Handle 404 Not Found routes
app.use(notFoundHandler);

// ✅ Error handling
app.use(errorHandler);

export default app;
