const config = require("./utils/config");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const URI = process.env.NODE_ENV === "test"
  ?config.TEST_MONGO_URI
  :config.MONGO_URI;

logger.info("connecting to", URI);

mongoose.connect(URI).then(() => {
  logger.info("connected to mongoDB");
})
  .catch(error => {
    logger.error("error connecting to MongoDB");
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/blogs", middleware.userExtractor,blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;