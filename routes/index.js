const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const photoApi = require("./photo.api");
const bookmarkApi = require("./bookmark.api")

router.use("/user", userApi);
router.use("/photo", photoApi);
router.use("/bookmark", bookmarkApi)

module.exports = router;