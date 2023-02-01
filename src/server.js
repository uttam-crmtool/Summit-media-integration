require("module-alias/register");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  BASE_URL,
  ENVIRONMENT,
  PORT,
  WELCOME_MESSAGE,
} = require("@config/env.config");
const { logger } = require("@config/logger.config");
const createHttpError = require("http-errors");
const routes = require("@routes/index.routes");
require("@config/mongodb.config");

const app = express();

/**
 * middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":remote-addr :remote-user :method :url :status - :response-time ms", {
    stream: { write: (message) => logger.http(message) },
  })
);

/**
 * route handling
 */
app.use(routes);

// # catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

// # sentry error
// app.use(sentry)

// # error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.message || "Something went wrong." });
});

/**
 * listening the connection
 */

app
  .listen(PORT, () => {
    logger.info(`* * * ${WELCOME_MESSAGE} * * *`);
    logger.info(`* * * URL :: ${BASE_URL}/auth :: ${ENVIRONMENT} * * *`);
  })
  .on("error", (error) => {
    logger.error(`* * * Server Error * * *`);
    logger.error(error.message);
  });
