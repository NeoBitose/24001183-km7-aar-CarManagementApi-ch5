const router = require("express").Router();


const Auth = require("./authRoute");
const User = require("./userRoute");
const Car = require("./carRoute");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/cars", Car);

module.exports = router
