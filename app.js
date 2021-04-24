import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import passport from "passport";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Routers -------------------------------
import userRouter from "./routes/userRoutes.js";
import configRouter from "./routes/configRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import shipmentTypeRouter from "./routes/shipmentTypeRoutes.js";
import packagingTypeRouter from "./routes/packagingTypeRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import shipmentRouter from "./routes/shipmentRoutes.js";
import airShipmentRouter from "./routes/airShipmentRoutes.js";
import seaShipmentRouter from "./routes/seaShipmentRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import serviceProviderRouter from "./routes/serviceProviderRoutes.js";
import portsRouter from "./routes/portRoutes.js";
import truckingAgentRouter from "./routes/truckingAgentRoutes.js";
import customerClearanceAgentRouter from "./routes/customerClearanceAgentRoutes.js";
import paymentStatementRouter from "./routes/paymentStatementRoutes.js";
import allShipmentsRouter from "./routes/allShipmentRoutes.js";

dotenv.config();

const app = express();
//*============================================

// Passport config (local-strategy)
import passportConfig from "./config/passport.js";
passportConfig(passport);
//! =============== GLOBALE Middlewares

//* Set security HTTP headers
app.use(helmet());

//------------------------------------

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//------------------------------------

//* Prevent DOS attacks & Brute force attacks.
// limit to only 100 request from the same IP in 1 hour
const limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000, // time depends on business
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//------------------------------------

//* Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

//------------------------------------

//* parse data coming from a URL encoded form (POST requests)
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// extended: true -> accepts POSTed nested objects.

//------------------------------------

//* Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

//------------------------------------

//* Data Sanitization against XSS
app.use(xss()); // converts html code to html entities

//------------------------------------

//* Prevent parameter pollution on query strings
app.use(
  hpp({
    whitelist: [], // allow duplication of query params.
  })
);

//------------------------------------

app.use(cors());

//------------------------------------

// passport middleware
app.use(passport.initialize()); // initialize passport

//*============================================
//! =============== ROUTES
app.use("/api/users", userRouter);
app.use("/api/configs", configRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/shipmentTypes", shipmentTypeRouter);
app.use("/api/packagingTypes", packagingTypeRouter);
app.use("/api/customers", customerRouter);
app.use("/api/shipments", shipmentRouter);
app.use("/api/airShipments", airShipmentRouter);
app.use("/api/seaShipments", seaShipmentRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/serviceProviders", serviceProviderRouter);
app.use("/api/ports", portsRouter);
app.use("/api/truckingAgents", truckingAgentRouter);
app.use("/api/customerClearanceAgents", customerClearanceAgentRouter);
app.use("/api/paymentStatements", paymentStatementRouter);
app.use("/api/allShipments", allShipmentsRouter);

//*============================================
// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//*============================================

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// Central Global Error Handling
app.use(globalErrorHandler);

//*============================================

export default app;
