const dotenv = require("dotenv");
const path = require("path");

const environment = process.env.ENVIRONMENT?.trim() || "development";

dotenv.config({
  path: path.resolve(`./.env.${environment}`),
});

const envObject = {
  ENVIRONMENT: environment,
  WELCOME_MESSAGE: process.env.WELCOME_MESSAGE || "Welcome",
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URL: process.env.GMAIL_REDIRECT_URL,
};

module.exports = envObject;
