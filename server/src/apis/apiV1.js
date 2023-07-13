const express = require("express");

const authRouter = require("../routers/authRouter");
const listRouter = require("../routers/listRouter");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", listRouter);

module.exports = router;
