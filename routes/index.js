const router = require("express").Router();
const { systemController } = require("../controllers/api/v1");

const Auth = require("./authRoute");
const User = require("./userRoute");
const Car = require("./carRoute");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/cars", Car);

router.use("/api/v1/health-check", systemController.healtcheck)
router.use(systemController.onLost);
router.use(systemController.onError);

module.exports = router
