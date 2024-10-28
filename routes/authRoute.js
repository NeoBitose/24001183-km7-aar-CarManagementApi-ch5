const router = require("express").Router();

const { authController } = require("../controllers/api/v1")

router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router;