const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../libs/swagger.json");

require("dotenv").config();

const { sendError } = require("../middlewares");

const { apiRouter } = require("../routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/api/auth", apiRouter.authRouter);
app.use("/api/groups", apiRouter.groupsRouter);
app.use("/api/contacts", apiRouter.contactsRouter);
app.use("/api/avatars", express.static("./public/avatars"));

app.use(sendError);

module.exports = app;
