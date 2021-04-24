import dotenv from "dotenv";
import chalk from "chalk";

import connectDB from "./config/db.js";
const cmdSuccess = chalk.bgGreen.white;
const cmdDanger = chalk.bgRed.white;
//*============================================

//! =============== Uncaught Exceptions Handler
process.on("uncaughtException", (err) => {
  console.log("------------------------------------------------------");
  console.log(cmdDanger("UNCAUGHT EXCEPTION!  Shutting down..."));
  console.log("------------------------------------------------------");
  console.log(cmdDanger(`${err.name}:`), err.message);
  console.log("------------------------------------------------------");

  process.exit(1);
});

//------------------------------------

//* Environment Variables
dotenv.config();

//* NodeJS App
import app from "./app.js";

//------------------------------------
//* DB Configs
connectDB();

//! =============== Start Server ===============
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("------------------------------------------------------");
  console.log(cmdSuccess(`App running ${chalk.red(`on PORT ${port}`)}`));
  console.log("------------------------------------------------------");
});

//! =============== Unhandled Promise Rejections Handler
process.on("unhandledRejection", (err) => {
  console.log(cmdDanger("UNHANDLED REJECTION!  Shutting down..."));
  console.log(err.name, err.message);
  console.log("------------------------------------------------------");

  server.close(() => {
    // give server time to finish all the still-pending requests.
    process.exit(1); // shutdown app.
    //0 => success.
    //1 => uncaught exception.
  });
});
