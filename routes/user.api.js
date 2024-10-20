const express = require("express");
const router = express.Router();
const userApi = require("./user.api");

const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");


router.post('/', userController.createUser);
router.post("/login", userController.loginWithEmail);


router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
