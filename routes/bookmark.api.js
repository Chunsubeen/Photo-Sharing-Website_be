const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const bookmarkController = require("../controllers/bookmark.controller");


router.post("/", authController.authenticate, bookmarkController.addPhotoToBookmark)
router.get("/", authController.authenticate, bookmarkController.getBookmark)
router.delete("/:bookmarkId", authController.authenticate, bookmarkController.deleteBookmark);

module.exports = router;