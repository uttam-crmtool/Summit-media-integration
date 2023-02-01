const express = require("express");
const createHttpError = require("http-errors");
const { WELCOME_MESSAGE } = require("@config/env.config");
const { handleAuthCallback } = require("@controllers/auth.controller");
const { handleAuth } = require("@controllers/auth.controller");
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

routes.get(`/auth`, handleAuth);

routes.get(`/authorize-google/callback`, handleAuthCallback); // /oauthcallback?code=

module.exports = routes;
