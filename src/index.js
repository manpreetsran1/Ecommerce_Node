require("dotenv").config();
const app = require("./app");
const connectDatabase = require("../config/database");
const cloudinary = require("cloudinary");
///handle uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);

  console.log(`shutting down the server due to uncaught exception`);

  process.exit(1);
});

// console.log(dfj);
//confg database

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});
