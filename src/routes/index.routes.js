const express = require("express");
const createHttpError = require("http-errors");
const { WELCOME_MESSAGE } = require("../config/env.config");
const routes = express.Router();

routes.get("/", async (req, res, next) => {
  try {
    return res.status(200).send(`${WELCOME_MESSAGE}`);
  } catch (error) {
    logger.debug(error);
    logger.error(`Error in index route :: ${error.message}`);
    next(
      createHttpError(
        500,
        `Error in index route :: ${error.message ?? "Something went wrong"}`
      )
    );
  }
});

module.exports = routes;
