const express = require("express");

const authRouter = require("../routers/authRouter");
const listRouter = require("../routers/listRouter");
const movieRouterAdmin = require("../routers/movieRouter/movieRouterAdmin");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", listRouter);
router.use("/admin", movieRouterAdmin);

module.exports = router;
