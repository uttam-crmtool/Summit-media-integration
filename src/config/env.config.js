const dotenv = require("dotenv");
const path = require("path");

const environment = process.env.ENVIRONMENT?.trim() || "development";

dotenv.config({
  path: path.resolve(`./.env.${environment}`),
});

const envObject = {
  ENVIRONMENT: environment,
  PORT: Number(process.env.PORT) || 8080,
  BASE_URL: process.env.BASE_URL || "http://localhost:8080",
  WELCOME_MESSAGE: process.env.WELCOME_MESSAGE || "Welcome",
};

module.exports = envObject;
