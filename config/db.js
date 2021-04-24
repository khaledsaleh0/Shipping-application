import mongoose from "mongoose";
import chalk from "chalk";
const cmdSuccess = chalk.bgGreen.white;

//*============================================

const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<DATABASE_USER>",
    process.env.DATABASE_USER
  )
    .replace("<DB_USER_PASSWORD>", process.env.DB_USER_PASSWORD)
    .replace("<DATABASE_NAME>", process.env.DATABASE_NAME);

  const DB_LOCAL = process.env.DATABASE_LOCAL.replace(
    "<DATABASE_NAME>",
    process.env.DATABASE_NAME
  );

  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production" ? DB : DB_LOCAL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log(
      cmdSuccess(
        `DB Connection successful! ${chalk.red(
          `on ${process.env.NODE_ENV.toUpperCase()}`
        )}`
      )
    );
    console.log("------------------------------------------------------");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
