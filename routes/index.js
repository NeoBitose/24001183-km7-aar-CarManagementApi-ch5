const router = require("express").Router();
const { SystemController } = require("../controllers/api/v1");

const Auth = require("./authRoute");
const User = require("./userRoute");
const Car = require("./carRoute");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/cars", Car);

router.use("/api/v1/health-check", SystemController.healtcheck)
router.use(SystemController.onLost);
router.use(SystemController.onError);

module.exports = router
