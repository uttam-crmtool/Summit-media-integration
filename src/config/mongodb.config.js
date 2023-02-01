const mongoose = require("mongoose");
const { logger } = require("@config/logger.config");
const { DATABASE_URL } = require("@config/env.config");

mongoose.connect(DATABASE_URL).catch((error) => {
  logger.error(`* * * Database connected failed -> ${error.message} * * *`);
});

const db = mongoose.connection;
db.on("error", (error) => {
  logger.error(`* * * Database connected error -> ${error.message} * * *`);
});
db.once("open", () => {
  logger.info("* * * Database connected successfully * * *");
});
