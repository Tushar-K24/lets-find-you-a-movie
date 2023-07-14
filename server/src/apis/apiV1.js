const express = require("express");

const authRouter = require("../routers/authRouter");
const listRouter = require("../routers/listRouter");
const userRouter = require("../routers/userRouter");
const favouritesRouter = require("../routers/favouritesRouter");
const movieRouterAdmin = require("../routers/movieRouter/movieRouterAdmin");
const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);
router.use("/user", listRouter);
router.use("/user", favouritesRouter);

router.use("/admin", movieRouterAdmin);

module.exports = router;
