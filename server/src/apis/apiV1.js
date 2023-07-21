const express = require("express");

const authRouter = require("../routers/authRouter");
const listRouter = require("../routers/listRouter");
const userRouter = require("../routers/userRouter");
const favouritesRouter = require("../routers/favouritesRouter");
const movieRouterUser = require("../routers/movieRouter/movieRouterUser");
const movieRouterAdmin = require("../routers/movieRouter/movieRouterAdmin");
const recommendationsRouter = require("../routers/recommendationsRouter");
const genreRouter = require("../routers/genreRouter");

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);
router.use("/user", listRouter);
router.use("/user", favouritesRouter);
router.use("/user", movieRouterUser);
router.use("/user", recommendationsRouter);
router.use("/user", genreRouter);

router.use("/admin", movieRouterAdmin);

module.exports = router;
