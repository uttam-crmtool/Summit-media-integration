const { logger } = require("@config/logger.config");
const { google } = require("googleapis");
const Authorization = require("@models/user.model");
const oauth2Client = require("../config/google.config");

const handleAuth = async (req, res) => {
  try {
    const scopes = ["https://www.googleapis.com/auth/gmail.readonly"]; // gmail.readonly

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });
    console.log("url", authUrl);
    res.redirect(`${authUrl}`);
    // https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&response_type=code&client_id=522039723682-g7eujkfmma25qtqkht5c467bfir960rd.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauthorize-google%2Fcallback
  } catch (error) {
    console.log("error", error);
    logger.error(`Error in authentication :-${error.message}`);
  }
};

const handleAuthCallback = async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("tokens", tokens);

    const record = await Authorization.findOneAndUpdate(
      { gmail: "uttam@crmtoolbox.io" },
      {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      { new: true, upsert: true }
    );
    res.send({ message: "Success" });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { handleAuthCallback, handleAuth };
