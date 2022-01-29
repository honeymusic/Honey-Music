const express = require("express");
const Discord = require("discord.js");
const url = require("url");
const path = require("path");
const discordClient = require("../index");
require("dotenv").config();
const passport = require("passport");
const passportDiscord = require("passport-discord");
const Strategy = passportDiscord.Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const memoryStore = require("memorystore");
const settings = require("../config/settings.json");
module.exports = async (client) => {
  let PORT = process.env.PORT || 8080;
  const app = express();

  const mStore = memoryStore(session);
  app.use(
    session({
      store: new mStore({ checkPeriod: 86400000 }),
      secret: "Aryan",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  const strategy = new Strategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: `http://localhost:${PORT}/callback`,
      scope: ["identify", "guilds", "email", "guilds.join"],
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  );
  passport.use(strategy);

  app.get("/", (req, res) => {
    res.render("index.ejs", {
      Settings: settings,
      bot: discordClient,
      user: req.isAuthenticated() ? req.user : null,
    });
  });

  app.get(
    "/login",
    (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord")
  );

  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    async (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated() || !req.user)
      return res.redirect(
        "/?error=" + encodeURIComponent("Login first please!")
      );
    res.render("dashboard.ejs", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      Settings: settings,
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  app.get("/commands", (req, res) => {
    res.render("commands.ejs", {
      cmd: client.commands,
      bot: client,
      Settings: settings,
      user: req.isAuthenticated() ? req.user : null,
    });
  });

  app.listen(PORT, () => console.log(`Listening on port number ${PORT}`));
};
