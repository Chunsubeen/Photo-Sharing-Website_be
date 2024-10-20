const express = require("express");
const authController = require("../controllers/auth.controller");
const photoController = require("../controllers/photo.controller");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", authController.authenticate, upload.single('image'), photoController.createPhoto);

router.get("/", photoController.getPhoto);

router.put("/:id", authController.authenticate, photoController.updatePhoto);

router.delete("/:id", authController.authenticate, photoController.deletePhoto);


module.exports = router;
