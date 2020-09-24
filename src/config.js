import path from "path";
import merge from "lodash/merge";

const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }

  return process.env[name];
};

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    example: process.env.CI ? ".env.ci.example" : ".env.example"
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 5000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    mongo: {
      options: {}
    }
  },
  test: {},
  development: {
    mongo: {
      uri: process.env.MONGODB_URI,
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 5000,
    mongo: {
      uri: process.env.MONGODB_URI
    }
  }
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
